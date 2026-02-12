import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = ({setQuery}) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search:", search);
    

    // Example: navigate to search page
    // navigate(`/search?query=${search}`);
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600">
        NotesApp
      </h1>

      {/* Search Bar */}
      {token && (
        <form
          onSubmit={handleSearch}
          className="flex items-center border rounded-lg overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setQuery(e.target.value);
            }}
            className="px-3 py-2 outline-none"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      )}

      {/* Right Side */}
      <div className="flex items-center space-x-6">
        {token ? (
          <>
            <span className="text-gray-700 font-medium">
              Hi, <span className="text-blue-600">{userName}</span>
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
