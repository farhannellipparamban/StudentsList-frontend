import React from "react";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

const Error500: React.FC = () => {
  const location = useLocation();
  let role: string | undefined;

  const pathname = location.pathname;
  if (pathname) {
    if (pathname.startsWith("/")) {
      role = "admin";
    }
  }

  const getHomeUrl = (): string => {
    switch (role) {
      case "admin":
        return "/";
      default:
        return "/";
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center p-5 w-full bg-gray-100">
        <div className="text-center">
          <div className="inline-flex rounded-full bg-green-500 p-4">
            <div className="rounded-full bg-white p-4">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="w-20 h-20 text-violet-600"
              />
            </div>
          </div>
          <h1 className="mt-5 text-4xl font-bold text-black lg:text-6xl">
            500 - Server Error
          </h1>
          <p className="text-black mt-5 text-lg">
            Oops! Something went wrong. Please try refreshing the page or <br />{" "}
            contact us if the problem persists.
          </p>
          <Link
            to={getHomeUrl()}
            className="mt-8 bg-green-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-700 inline-block"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error500;
