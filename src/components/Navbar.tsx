import { Link, useLocation } from "react-router-dom"
import { Mic, Search, Home } from "lucide-react"

const Navbar = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path ? "bg-blue-100 text-blue-700" : "text-slate-700 hover:bg-blue-50"
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-blue-600 font-bold text-xl">
              HOLON AI
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${isActive("/")}`}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
            <Link
              to="/record"
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${isActive("/record")}`}
            >
              <Mic className="w-4 h-4 mr-2" />
              Record
            </Link>
            <Link
              to="/search"
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${isActive("/search")}`}
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
