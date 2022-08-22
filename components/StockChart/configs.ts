import { TooltipItem } from "chart.js";
import { TimeInterval } from ".";

interface FetchParams {
    chartConfig: { range: string, interval: string };
    labelsConfig: { month?: "short", day?: "numeric", hour?: "numeric", minute?: "numeric", hour12: true };
}
export const fetchConfig: Record<TimeInterval,FetchParams> = {
    "Day": {
        chartConfig: {
            range: "1d",
            interval: "5m"
        },
        labelsConfig: {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        },
    },
    "Week": {
        chartConfig: {
            range: "5d",
            interval: "1h"
        },
        labelsConfig: {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        },
    },
    "Month": {
        chartConfig: {
            range: "1mo",
            interval: "1h"
        },
        labelsConfig: {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        },
    },
    "ThreeMonth": {
        chartConfig: {
            range: "3mo",
            interval: "1d"
        },
        labelsConfig: {
            month: "short",
            day: "numeric",
            hour12: true,
        },
    },
    "Year": {
        chartConfig: {
            range: "1y",
            interval: "1d"
        },
        labelsConfig: {
            month: "short",
            day: "numeric",
            hour12: true,
        },
    },
};

export const chartConfig = {
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                footer: (tooltipItems: any): string => {
                    const startValue = tooltipItems[0].dataset.data.filter((x: any) => x != null)[0] as number;
                    const hoverValue = tooltipItems[0].parsed.y;
                    const percentChange = ((hoverValue - startValue) / hoverValue * 100);
                    return `${percentChange > 0 ? "+" : ""}${percentChange.toFixed(2)} %`;
                }   
            },
        }
    },
    scales: {
        x: {
            grid: {
                display: true,
                drawTicks: false,
                drawBorder: true,
                drawOnChartArea: false,
            },
            ticks: {
                display: false,
            },
        },
        y: {
            grid: {
                display: true,
                drawTicks: false,
                drawBorder: true,
                drawOnChartArea: false,
            },
            ticks: {
                display: false,
            },
        }
    },
    interaction: {
        mode: "index",
        intersect: false,
    },
};
