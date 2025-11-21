import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { SiAuthy } from "react-icons/si";
import { FaRegUser } from "react-icons/fa";
import { RiLoginCircleLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              {/* Logo + Brand */}
              <div className="flex items-center">
                <SiAuthy className="h-8 w-auto text-green-500" />
                <NavLink
                  to="/"
                  className="ml-2 text-lg font-semibold text-gray-900 hover:text-indigo-600"
                >
                  Expense Tracker
                </NavLink>
              </div>

              {/* Register + Login */}
              <div className="flex items-center">
                <NavLink
                  to="/register"
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
                >
                  <FaRegUser className="h-5 w-5" />
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className="ml-4 inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 animate-bounce"
                >
                  <RiLoginCircleLine className="h-5 w-5" />
                  Login
                </NavLink>

                {/* Mobile menu button */}
                <div className="ml-2 flex md:hidden">
                  <Disclosure.Button className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500">
                    {open ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <NavLink
                to="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
              >
                Expense Tracker
              </NavLink>
              <NavLink
                to="/register"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
              >
                Login
              </NavLink>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
