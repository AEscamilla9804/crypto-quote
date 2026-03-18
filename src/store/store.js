import { create } from "zustand"
import { persist } from "zustand/middleware"
import { createMarketSlice } from "./marketSlice"
import { createFundingSlice } from "./fundingSlice"
import { createPortfolioSlice } from "./portfolioSlice"

export const useStore = create(
    persist(
        (...a) => ({
            ...createMarketSlice(...a),
            ...createFundingSlice(...a),
            ...createPortfolioSlice(...a)
        }),
        {
            name: "crypto-storage",
            partialize: state => ({
                usdBalance: state.usdBalance,
                portfolio: state.portfolio
            })
        }
    )
)