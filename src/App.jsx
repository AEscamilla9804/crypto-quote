import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import Stocks from "./pages/Stocks"
import Funds from "./pages/Funds"
import SearchResultPage from "./pages/SearchResultPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <MainLayout /> }>
          <Route path="/" element={ <Home /> } index />
          <Route path="/coin/:id" element={<SearchResultPage />} />
          <Route path="/stocks" element={ <Stocks /> } />
          <Route path="/funds" element={ <Funds /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App