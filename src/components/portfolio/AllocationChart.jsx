import { useState, useEffect } from "react"
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency, fromUSD } from '../../utils'
import { useStore } from "../../store/store";

const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4"
]

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize)
    }, []);

    return isMobile
}

export default function AllocationChart({ portfolio, prices }) {
    const displayCurrency = useStore(state => state.displayCurrency);
    const isMobile = useIsMobile();

    const totalValue = portfolio.reduce((total, asset) => {
        const price = prices[asset.id] || 0
        return total + asset.quantity * price
    }, 0);

    const data = portfolio.map((asset, index) => {
        const { id, symbol, quantity } = asset;
        const price = prices[id] || 0
        const value = quantity * price;
        const percentage = totalValue ? (value / totalValue) * 100 : 0

        return {
            name: symbol.toUpperCase(),
            value,
            percentage,
            fill: COLORS[index % COLORS.length]
        }
    });

    if (!data.length) return null

    return (
        <div className='w-full md:w-[85%] bg-white rounded-md p-5'>
            <h3 className='text-xl font-bold text-center md:text-left'>
                Portfolio Allocation:
            </h3>

            <div className='w-full h-75 mt-3'>
                <ResponsiveContainer>

                {isMobile ? (
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={75}
                            labelLine={false}
                            label={({ name }) => name}
                        />
                    </PieChart>
                ) : (
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={110}
                            labelLine={false}
                            label={({ name }) => name}
                        />

                        <Tooltip
                            formatter={(value, name, props) => {
                                const localized = fromUSD(value, displayCurrency);
                                return `${props.payload.percentage.toFixed(1)}% (${formatCurrency(localized, displayCurrency)})`;
                            }}
                        />
                    </PieChart>
                )}

                </ResponsiveContainer>
            </div>

            { isMobile && (
                <div className="mt-4 space-y-2">
                    { data.map((asset) => {
                        const localizedValue = fromUSD(asset.value, displayCurrency);

                        return (
                            <div
                                key={asset.name}
                                className="flex items-center justify-between text-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: asset.fill }}
                                    />
                                    <span>{asset.name}</span>
                                </div>

                                <span>
                                    {asset.percentage.toFixed(1)}% (
                                    {formatCurrency(localizedValue, displayCurrency)}
                                    )
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}