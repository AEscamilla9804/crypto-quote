import { formatCurrency, toUSD } from "../utils";

export const createFundingSlice = (set, get) => ({
    displayCurrency: "USD",
    usdBalance: 1000,
    setDisplayCurrency: code => {
        set({ displayCurrency: code })
    },
    addFunds: (amount, currency) => {
        if (amount <= 0) return { success: false, message: "Amount must be greater than 0" }

        const usdAmount = toUSD(amount, currency);
        const localizedFormatted = formatCurrency(amount, currency);
        const usdFormatted = formatCurrency(usdAmount, "USD");

        set((state) => ({
            usdBalance: state.usdBalance + usdAmount
        }))

        if (currency === "USD") return { success: true, message: `Added ${usdFormatted} USD`}
        return { success: true, message: `Added ${localizedFormatted} (~${usdFormatted} USD)`}
    },
    withdrawFunds: (amount, currency) => {
        if (amount <= 0) return { success: false, error: "Invalid amount" }

        const usdAmount = toUSD(amount, currency);

        const { usdBalance } = get();

        if (usdAmount > usdBalance) return { success: false, error: "Insufficient funds"}

        const localizedFormatted = formatCurrency(amount, currency);
        const usdFormatted = formatCurrency(usdAmount, "USD");

        set((state) => ({
            usdBalance: state.usdBalance - usdAmount
        }));

        currency === "USD" ? { success: true, message: `Withdrew ${usdFormatted} USD`} : { success: true, message: `Withdrew ${localizedFormatted} (~${usdFormatted} USD)`}

        if (currency === "USD") return { success: true, message: `Withdrew ${usdFormatted} USD`}
        return { success: true, message: `Withdrew ${localizedFormatted} (~${usdFormatted} USD)`}
    }
});