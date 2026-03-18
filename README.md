💰 Crypto Portfolio Tracker

A client-side cryptocurrency portfolio tracker built with React and Zustand.
The app allows users to simulate buying and selling crypto assets, manage funds, track portfolio performance, and visualize allocation — all while handling real-world API limitations such as rate limits and network failures.

Designed as a fundamentals-focused project to practice state management, async data handling, and resilient UI patterns without relying on data-fetching libraries like React Query.

📌 Overview

This project simulates a simplified crypto trading environment with three main flows:

- Market View → Browse cryptocurrencies and search assets
- Portfolio Management → Buy and sell assets with real-time pricing
- Portfolio Analytics → Track total value, profit/loss, and allocation
- Funds Management → Deposit and withdraw USD balance

The app emphasizes manual state management, API handling, and UX under failure conditions, mimicking real-world frontend challenges.

✨ Features

Market

- Paginated cryptocurrency list
- Search functionality (CoinGecko API)
- Individual asset lookup

Portfolio

- Buy / Sell crypto assets
- Weighted average price calculation
- USD balance tracking
- Portfolio state management
- Real-time portfolio updates

Funds Management

- Initial funding equivalent to $1,000.00 USD
- Deposit funds into account
- Withdraw funds with validation
- Balance updates reflected across the app

Analytics

- Portfolio total value
- Profit & Loss (PnL) calculation
- Asset allocation visualization (chart)

🌍 Localization

- Currency formatting using Intl.NumberFormat
- Dynamic locale support based on selected currency
- Consistent formatting across all financial values

Currencies supported: USD, MXN, EUR, GBP, JPY, AUD

UX & Resilience

- Graceful handling of API rate limits
- Error messaging without breaking UI
- Prevention of NaN propagation in calculations

🧠 Technical Highlights

This project intentionally avoids libraries like React Query to reinforce core concepts and manual control over state and data flow.

🧩 State Architecture (Slice Pattern)

- Global state managed with Zustand
- Implemented using slice pattern:
    - fundingsSlice
    - marketSlice
    - portfolioSlice

👉 Benefits:

- Clear separation of concerns
- Scalable state structure
- Easier debugging and maintenance

⚠️ Error Handling

- Differentiation between:
    - HTTP errors (e.g. 429 rate limit)
    - Network failures
- UI remains stable even when requests fail

🛡️ Defensive Programming

- Guards against malformed API responses
- Safe handling of undefined values
- Prevention of NaN propagation in calculations

💾 Request Optimization

- Batched API requests for portfolio assets
- Cooldown logic to prevent excessive API calls
- Avoids redundant requests during rapid user interactions

This approach reduces API pressure without introducing full caching complexity.

📌 Trade-offs

Chose cooldown over caching to:

- Keep implementation simple
- Stay aligned with project goal (React fundamentals)
- Avoid stale data synchronization issues

🧰 Tech Stack

Frontend

- React
- Zustand
- Tailwind CSS

Data & APIs

- CoinGecko API

📂 Project Structure

/src
  /components
    /funds
    /market
    /portfolio
    /ui
  /layout
  /pages
  /utils
  /store
    fundingSlice.js
    marketSlice.js
    portfolioSlice.js
    store.js

⚙️ Installation

Clone the repository:

git clone https://github.com/yourusername/crypto-portfolio
cd crypto-portfolio

Install dependencies:

npm install

Run development server:

npm run dev

⚠️ Limitations

- Relies on external API (CoinGecko) with strict rate limits
- No persistent backend (state resets on refresh)
- Prices are not real-time and may be delayed
- Network failures may temporarily prevent updates

🎯 Future Improvements

- Implement client-side caching with stale-while-revalidate strategy (React Query)
- Add backend for persistent portfolio storage
- Implement authentication
- Improve chart handling for partial/missing data
- Add optimistic updates

👨‍💻 Author

Alan Escamilla

- Mechatronic Engineer
- Full-Stack Web Developer (React / JavaScript / TypeScript / NextJS)

📄 License

This project is for educational and portfolio purposes.