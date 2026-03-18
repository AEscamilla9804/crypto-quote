import { Outlet } from "react-router-dom"
import Navbar from "../components/ui/Navbar"
import { ToastContainer } from "react-toastify"

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-100">
      <header className="p-6 bg-slate-800 w-full">
        <Navbar />
      </header>

      <main className="w-full flex-1 mt-10 px-6">
        <Outlet />
      </main>

      <ToastContainer 
        autoClose={3000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        closeOnClick
      />
    </div>
  )
}