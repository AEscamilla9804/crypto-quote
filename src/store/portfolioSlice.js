export const createPortfolioSlice = (set, get) => ({
    portfolio: {},
    prices: {},
    fetchPortfolioPrices: async () => {
        const { portfolio } = get();

        if (Object.keys(portfolio).length === 0) return

        const ids = Object.values(portfolio)
            .map(asset => asset.id)
            .join(",");

        try {
            const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error("RATE_LIMIT");
                }
                throw new Error("Failed to fetch portfolio prices");
            }

            const data = await response.json();
            console.log(data)
            const prices = {};

            Object.entries(data).forEach(([id, value]) => {
                if (value && typeof value.usd === "number") {
                    prices[id] = value.usd;
                }
            });

            set(state => ({
                prices: {
                    ...state.prices,
                    ...prices
                },
                error: null
            }));
        } catch (error) {
            console.error(error);
            let message;

            if (error.message === "RATE_LIMIT") {
                message = "Too many requests. Please wait before refreshing";
            } else if (error instanceof TypeError) {
                message = "Prices may be outdated. Connection issue";
            } else {
                message = error.message;
            }

            set({ error: message });
        }
    },
    buyAsset: async ({ id, name, symbol }, quantity) => {
        if (quantity <= 0) return

        try {
            const { fetchCoinPrice, usdBalance, portfolio } = get();

            /** Step 1: Search for the coin data */
            const currentPrice = await fetchCoinPrice(id);

            /** Step 2: Calculate the action cost */
            const totalCost = currentPrice * quantity;

            if (usdBalance < totalCost) {
                const message = "Insufficient Funds"
                return { success: false, error: message }
            }

            const existing = portfolio[id];
            let updatedAsset;

            /** Step 3: Update portfolio  */
            if (existing) {
                const newQuantity = existing.quantity + quantity;

                /** Weighted average formula */
                const newAverage = 
                    ( existing.quantity * existing.averagePrice + quantity * currentPrice ) / newQuantity

                updatedAsset = {
                    ...existing,
                    quantity: newQuantity,
                    averagePrice:newAverage
                }
            } else {
                updatedAsset = { id, name, symbol, quantity, averagePrice: currentPrice }
            }

            set({
                usdBalance: usdBalance - totalCost,
                portfolio: {
                    ...portfolio,
                    [id]: updatedAsset
                }
            });

            return { success: true, message: `Bought ${quantity} ${symbol.toUpperCase()}` }
        } catch (error) {
            console.error(error)
            return { success: false, error: "Something went wrong" }
        }
    },
    sellAsset: async (coinId, quantity) => {
        if (quantity <= 0) return

        try {
            const { fetchCoinPrice, portfolio, usdBalance } = get();

            /** Step 1: Check Assest Exists */
            const existing = portfolio[coinId];

            if (!existing) return { success: false, error: "Asset not found in portfolio" }
            if (existing.quantity < quantity) return { success: false, error: "Not enough balance to sell" }

            /** Step 2: Fetch Price */
            const currentPrice = await fetchCoinPrice(coinId);

            const saleValue = currentPrice * quantity;
            const remainingAssets = existing.quantity - quantity;

            /** Step 3: Update Portfolio */
            const updatedPortfolio = { ...portfolio }

            if (remainingAssets <= 0) {
                delete updatedPortfolio[coinId]
            } else {
                updatedPortfolio[coinId] = {
                    ...existing,
                    quantity: remainingAssets
                }
            }

            set({
                usdBalance: usdBalance + saleValue,
                portfolio: updatedPortfolio
            })

            return { success: true, message: `Sold ${quantity} ${existing.symbol.toUpperCase()}` }
        } catch (error) {
            console.error(error)
            return { success: false, error: "Something went wrong" }
        }
    },
    resetPortfolio: () => {
        set({
            portfolio: {},
            usdBalance: 1000
        })
    }
})