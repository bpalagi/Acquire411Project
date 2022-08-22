import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { TopBar } from "../../components/TopBar";
import styles from "./dashboard.module.scss";

interface Portfolio {
    portfolio_id: number,
    user_id: number,
    name: string,
    cash: number,
};

const DashboardPage = () => {
    const router = useRouter();

    const [showCreatePortfolioCard, setShowCreatePortfolioCard] = useState(false);

    const [portfolioName, setPortfolioName] = useState("");
    const [portfolioStartingValue, setPortfolioStartingValue] = useState("100000");

    const [portfolios, setPortfolios] = useState<any[]>([]);
    const [holdings, setHoldings] = useState<any[]>([]);

    const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);

    const isAuthenticated = async () => {
        const response = await axios.get("/api/user", {
            headers: {
                "x-access-token": localStorage.getItem("token") as string
            },
        });
        if (!response.data.authenticated) {
            router.push("/");
        }
    };

    const getPortfoliosAndHoldings = async () => {
        const portfolioResponse = await axios.get("api/portfolio/", {
            headers: {
                "x-access-token": localStorage.getItem("token") as string
            },
        });
        setPortfolios(portfolioResponse.data);
        setSelectedPortfolio(null);
        const holdingResponse = await axios.get("api/holding/"+portfolioResponse.data[0].portfolio_id);
        setHoldings(holdingResponse.data);
    };

    const updateHoldings = async (id: number) => {
        const holdingResponse = await axios.get("api/holding/"+id);
        setHoldings(holdingResponse.data);
    }

    const createPortfolio = () => {
        axios.post("api/portfolio", {
            name: portfolioName,
            cash: portfolioStartingValue,
        }, {
            headers: {
                "x-access-token": localStorage.getItem("token") as string
            },
        });
        setShowCreatePortfolioCard(false);
    };

    // runs on page load
    useEffect(() => {
        isAuthenticated();
        if (selectedPortfolio) {
            getPortfoliosAndHoldings();
        }
    }, []);

    useEffect(() => {
        if (selectedPortfolio) {
            updateHoldings(selectedPortfolio.portfolio_id);
        }
    }, [selectedPortfolio]);

    return (
        <div>
            <TopBar />
            {showCreatePortfolioCard && (
                <div className={styles.dashboard__createPortfolioCard}>
                    <h1>New Portfolio</h1>
                    <label>
                        Name
                        <input value={portfolioName} onChange={e => setPortfolioName(e.target.value)}/>
                    </label>
                    <label>
                        Starting Value
                        <input value={portfolioStartingValue} onChange={e => setPortfolioStartingValue(e.target.value)}/>
                    </label>
                    <div className={styles.dashboard__createPortfolioCard__buttons}>
                        <button onClick={() => setShowCreatePortfolioCard(false)}>Close</button>
                        <button onClick={createPortfolio}>Create</button>
                    </div>
                </div>
            )}
            <div className={styles.dashboard__header}>
                <h1 className={styles.dashboard}>Dashboard</h1>
                <button onClick={() => setShowCreatePortfolioCard(true)}>Create a Portfolio</button>
            </div>
            <div>
                <h2>Portfolios</h2>
                <select id="portfolios" value={selectedPortfolio?.name || "Create a portfolio to get started!"} onChange={(e) => {
                    const portfolio = portfolios.find(elem => elem.name == e.target.value);
                    debugger
                    setSelectedPortfolio(portfolio);
                    updateHoldings(portfolio.portfolio_id);
                }}>
                    {portfolios.map((portfolio) => <option value={portfolio.id}>{portfolio.name}</option>)}
                </select>
            </div>
            <div>
                <h2>
                    Value
                </h2>
                <div>{selectedPortfolio?.cash}</div>
            </div>
            
            <h2>Holdings</h2>
            <table className={styles.dashboard__holdingsTable}>
                <tr>
                    <th>Ticker Symbol</th>
                    <th>Company Name</th>
                    <th>Shares</th>
                </tr>
                {holdings.map((holding) => (
                    <tr>
                        <td>{holding.ticker_symbol}</td>
                        <td>{holding.company_name}</td>
                        <td>{holding.total_quantity}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default DashboardPage;
