export function formatCurrency(amount, currency) {
    const safeCurrency = currency || "USD";
    const locale = currencyLocales[currency] || "en-US";

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: safeCurrency,
        maximumFractionDigits: 2
    }).format(amount);
}

export function formatMarketCap(amount, currency) {
    let value = amount;
    let suffix = "";

    if (amount >= 1_000_000_000_000) {
        value = amount / 1_000_000_000_000;
        suffix = "T";
    } else if (amount >= 1_000_000_000) {
        value = amount / 1_000_000_000;
        suffix = "B";
    } else if (amount >= 1_000_000) {
        value = amount / 1_000_000;
        suffix = "M";
    } else if (amount >= 1_000) {
        value = amount / 1_000;
        suffix = "K";
    }

    // Format the shortened number as currency
    const formatted = new Intl.NumberFormat('en', {
        style: "currency",
        currency,
        maximumFractionDigits: 2
    }).format(value);

    return `${formatted} ${suffix}`
}

export const currencies = [
    { code: "USD", name: "US Dollar (USD)" },
    { code: "MXN", name: "Mexican Peso (MXN)" },
    { code: "EUR", name: "Euro (EUR)" },
    { code: "JPY", name: "Japanese Yen (JPY)" },
    { code: "GBP", name: "British Pound (GBP)" },
    { code: "AUD", name: "Australian Dollar (AUD)" }
];

export const currencyLocales = {
    USD: "en-US",
    MXN: "es-MX",
    EUR: "de-DE",
    JPY: "ja-JP",
    GBP: "en-GB",
    AUD: "en-AU"
}

export const rates = {
    USD: 1,
    MXN: 17.67,
    EUR: 0.87,
    JPY: 158.97,
    GBP: 0.75,
    AUD: 1.41
}

export function toUSD(amount, currency) {
    return currency === "USD"
        ? amount
        : amount / rates[currency]
}

export const fromUSD = (amount, currency) => {
  return amount * rates[currency]
}