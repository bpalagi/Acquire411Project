import axios from "axios";
import "chart.js/auto";
import { ChartOptions } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Chart, ChartProps } from "react-chartjs-2";
import { chartConfig, fetchConfig } from "./configs";
import styles from "./stockChart.module.scss";

const COLOR_GREEN = "#40F293";
const COLOR_RED = "#D95961";

export enum TimeInterval {
    Day = "Day",
    Week = "Week",
    Month = "Month",
    ThreeMonth = "ThreeMonth",
    Year = "Year",
}

type ChartData = ChartProps<"line", (number | null)[], unknown>["data"];

const fetchChart = async (
    tickerSymbol: string,
    timeInterval: TimeInterval
): Promise<ChartData> => {
    const response = await axios.get(`/api/chart/${tickerSymbol}`, {
        params: fetchConfig[timeInterval].chartConfig
    });
    const dates: string[] = response.data.timestamp.map((timestamp: number) => 
        (new Date(timestamp*1000)).toLocaleString("en-US", 
            fetchConfig[timeInterval].labelsConfig
        ).toUpperCase()
    );
    const prices: (number | null)[] = response.data.indicators.quote[0].high.map((price: number) => 
        !price ? price : price.toFixed(2)
    );
    const nonNullPrices = prices.filter(x => x != null) as number[];
    const color = nonNullPrices[0] < nonNullPrices[nonNullPrices.length-1] ? COLOR_GREEN : COLOR_RED;
    return ({
        labels: dates,
        datasets: [{
            data: prices,
            borderColor: color,
            pointBorderColor: "rgba(0,0,0,0)",
            pointBackgroundColor: "rgba(0,0,0,0)",
        }],
    });
};

interface StockChartProps {
    tickerSymbol: string;
};

export const StockChart = (props: StockChartProps): JSX.Element => {
    const [timeInterval, setTimeInterval] = useState<TimeInterval>(TimeInterval.Day);
    const [displayChart, setDisplayChart] = useState<ChartData>({
        labels: [],
        datasets: []
    });
    const [displayChartCache, setDisplayChartCache] = useState<Record<TimeInterval,ChartData | null>>({
        "Day": null,
        "Week": null,
        "Month": null,
        "ThreeMonth": null,
        "Year": null,
    });

    const currentPrice = displayChartCache.Day?.datasets[0].data.filter(x => x != null).slice(-1)[0];

    const showDisplayChart = async (tickerSymbol: string, timeInterval: TimeInterval): Promise<void> => {
        // check cache for graph, otherwise perform query and update cache/display
        if (!displayChartCache[timeInterval]) {
            const chart = await fetchChart(tickerSymbol, timeInterval);
            setDisplayChart(chart);
            setDisplayChartCache({
                ...displayChartCache,
                [timeInterval]: chart,
            });
        } else {
            setDisplayChart(displayChartCache[timeInterval] as ChartData);
        }
    }

    useEffect(() => {
        showDisplayChart(props.tickerSymbol, timeInterval);
    }, [timeInterval]);

    return (
        <div className={styles.stockChart}>
            <div className={styles.stockChart__header}>
                <h1>{props.tickerSymbol}</h1>
                <h1>{currentPrice}</h1>
            </div>
            <div>
                <div className={styles.stockChart__timeIntervalButtons}>
                    <button onClick={() => setTimeInterval(TimeInterval.Day)}>1D</button>
                    <button onClick={() => setTimeInterval(TimeInterval.Week)}>1W</button>
                    <button onClick={() => setTimeInterval(TimeInterval.Month)}>1M</button>
                    <button onClick={() => setTimeInterval(TimeInterval.ThreeMonth)}>3M</button>
                    <button onClick={() => setTimeInterval(TimeInterval.Year)}>1Y</button>
                </div>
            </div>
            
            <Chart
                type="line"
                data={displayChart}
                options={chartConfig as ChartOptions}
            />            
        </div>
    );
}
