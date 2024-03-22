import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "./index";
import { Link, NavLink} from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// icons
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaBars } from "react-icons/fa6";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  // sidebar actions
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <header className="py-1  text-white ">
        <Container>
          <nav className="flex justify-between items-center">
            <Link className="flex justify-center items-center" to="/">
                <Logo />
                <div className="display-block text-bold text-slate-300 text-3xl">Blogger</div>
            
              
            </Link>
            <div id="nav-content" className="flex justify-center items-center">
              <ul
                id="notSidebar"
                className="w-full flex ml-auto max-sm:hidden md:flex lg:flex p-4"
              >
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name} className="mx-2">
                      <button
                        onClick={() => navigate(item.slug)}
                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
                {authStatus && (
                  <li className="mx-2">
                    <LogoutBtn />
                  </li>
                )}
              </ul>
              <ul
                id="sidebar"
                className="flex ml-auto max-sm:flex md:hidden lg:hidden p-4"
              >
                <li>
                  <button
                    onClick={toggleSidebar}
                    className="p-3 duration-200 bg-gradient-to-r bg-slate-700 hover:bg-slate-600 rounded-full"
                  >
                    <FaBars />
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </Container>
      </header>

      {/* sidebar popup */}
      <Container>
        <div
          className={`sidebar lg:hidden backdrop-blur-xl text-white p-4 w-9/12 ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          } flex items-center justify-center gap-28 flex-col z-20 list-none lg:translate-x-0 transition-transform duration-500 ease-in-out fixed top-0 right-0 h-full overflow-y-auto`}
        >
          <button
            className="text-2xl border-none focus:outline-none lg:hidden p-3 duration-200 bg-gradient-to-r bg-slate-700 hover:bg-slate-600 rounded-full"
            onClick={closeSidebar}
          >
            <IoMdCloseCircleOutline />
          </button>
          <div
            id="mylinks"
            className="flex items-center px-5 justify-start gap-5 h-full flex-col"
          >
            {navItems.map((item) =>
              item.active ? (
                <li 
                key={item.name} 
                onClick={closeSidebar}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li onClick={closeSidebar}>
                <LogoutBtn />
              </li>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

export default Header;
