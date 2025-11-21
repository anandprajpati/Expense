import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { SiAuthy } from "react-icons/si";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/slice/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  const dispatch = useDispatch();

  // Logout handler
  const logoutHandler = () => {
    dispatch(logoutAction());
    localStorage.removeItem("userInfo");
    // optional: redirect to login
    window.location.href = "/login";
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Left side */}
              <div className="flex items-center">
                <div className="md:hidden mr-2">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {open ? (
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <SiAuthy className="h-8 w-auto text-green-500" />
                <Link
                  to="/"
                  className="ml-2 text-lg font-semibold text-gray-900 hover:text-indigo-600"
                >
                  Expense Tracker
                </Link>
              </div>

              {/* Desktop links */}
              <div className="hidden md:flex md:space-x-8">
                <Link to="/add-transaction" className="nav-link">
                  Add Transaction
                </Link>
                <Link to="/add-category" className="nav-link">
                  Add Category
                </Link>
                <Link to="/categories" className="nav-link">
                  Categories
                </Link>
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </div>

              {/* Right side */}
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={logoutHandler}  
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                  <IoLogOutOutline className="h-5 w-5" aria-hidden="true" />
                  Logout
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-2 hidden md:block">
                  <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/dashboard"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            My Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logoutHandler}  
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <Link to="/" className="mobile-link">
                Expense Tracker
              </Link>
              <Link to="/add-transaction" className="mobile-link">
                Add Transaction
              </Link>
              <Link to="/add-category" className="mobile-link">
                Add Category
              </Link>
              <Link to="/categories" className="mobile-link">
                Categories
              </Link>
              <Link to="/profile" className="mobile-link">
                Profile
              </Link>
              <Link to="/dashboard" className="mobile-link">
                My Dashboard
              </Link>
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <Disclosure.Button
                as="button"
                onClick={logoutHandler} 
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                Sign out
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
