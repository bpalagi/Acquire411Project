import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { TopBar } from "../../components/TopBar";

interface Stock {
    ticker_symbol: string;
    name: string;
}

const MarketSearchPage = () => {
    const router = useRouter();

    const isAuthenticated = async () => {
        const response = await axios.get("/api/user", {
            headers: {
                "x-access-token": localStorage.getItem("token") as string
            },
        });
        if (!response.data.authenticated) {
            router.push("/");
        }
    }

    useEffect(() => {
        isAuthenticated();
    });

    const searchfield = useState("");
    const searchval = searchfield[0];
    const setsearchfield = searchfield[1];

    const [displayStocks, setDisplayStocks] = useState<Stock[]>([]);

    const searchOnClick = async () => {
        const response = await axios.get("api/stock/" + searchval);
        setDisplayStocks(response.data);
    }

    return (
        <div>
            <TopBar />
            <h1>Market Search Page</h1>

            <input value={searchval} onChange={(event) => { setsearchfield(event.target.value); }}  />
            <button onClick={searchOnClick}>Search</button>
            <table>
                <tr>
                    <th>Ticker Symbol</th>
                    <th>Company Name</th>
                </tr>
                {displayStocks.map((stock) => (
                    <tr>
                        <td>{stock.ticker_symbol}</td>
                        <td>{stock.name}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default MarketSearchPage;
