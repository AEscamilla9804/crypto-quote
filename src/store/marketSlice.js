export const createMarketSlice = (set, get) => ({
    loading: false,
    market: [],
    currentPage: 1,
    perPage: 10,
    hasMore: true,
    coinData: null,
    error: null,
    setPage: page => {
        if (page < 1) return

        set({
            currentPage: page
        });
    },
    nextPage: () => {
        set((state) => ({
            currentPage: state.currentPage + 1
        }));
    },
    prevPage: () => {
        set((state) => ({
            currentPage: state.currentPage > 1 
                ? state.currentPage - 1
                : state.currentPage
        }));
    },
    fetchMarket: async () => {
        if ( get().loading ) return

        const { currentPage, perPage } = get();

        try {
            set({ loading: true, error: null });

            const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${currentPage}`
            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error("RATE_LIMIT");
                }
                throw new Error("Failed to fetch market data");
            }
            const data = await response.json();

            // Data Normalization
            const formattedData = data.map(coin => ({
                id: coin.id,
                name: coin.name,
                symbol: coin.symbol,
                image: coin.image,
                current_price: coin.current_price,
                market_cap: coin.market_cap,
                price_change_percentage_24h: coin.price_change_percentage_24h
            }));

            set({ 
                market: formattedData,
                hasMore: formattedData.length === perPage
            })
        } catch (error) {
            console.error(error);

            let message = "Something went wrong";

            if (error.message === "RATE_LIMIT") {
                message = "Too many requests, wait a moment and try again";
            } else if (error instanceof TypeError) {
                message = "Connection issue or rate limit reached. Please try again.";
            } else {
                message = error.message;
            }

            set({ error: message });
        } finally {
            set({ loading: false })
        }
    },
    fetchCryptoId: async query => {
        try {
            set({ loading: true, error: null, coinData: null })

            /** Step 1: Search */
            const url = `https://api.coingecko.com/api/v3/search?query=${query}`;
            const searchRes = await fetch(url);
            if (!searchRes.ok) throw new Error("Search failed");

            const searchData = await searchRes.json();
            if (!searchData.coins.length) throw new Error("No crypto found");

            const coinId = searchData.coins[0].id;
            return coinId;
        } catch (error) {
            set({ error: error.message })
            return null
        } finally {
            set({ loading: false })
        }
    },
    fetchCoinById: async coinId => {
        try {
            set({ loading: true, error: null })

            const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('No data found');

            const data = await response.json();
            if(!data.length) throw new Error("Coin not found");
            const coin = data[0];

            const formattedData = {
                id: coin.id,
                name: coin.name,
                symbol: coin.symbol,
                image: coin.image,
                current_price: coin.current_price,
                market_cap: coin.market_cap,
                price_change_percentage_24h: coin.price_change_percentage_24h
            };

            console.log(formattedData)

            set({ coinData: formattedData })
        } catch (error) {
            set({ error: error.message })
        } finally {
            set({ loading: false })
        }
    },
    fetchCoinPrice: async coinId => {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch coin price")

        const data = await response.json();

        if (!data[coinId]) throw new Error("Coin not found")

        return data[coinId].usd;
    }
});