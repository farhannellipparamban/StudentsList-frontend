import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const changePage = (num: number) => {
    onPageChange(num);
  };

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="list-style-none flex space-x-2 items-center justify-center my-5">
          {currentPage !== 1 && (
            <li>
              <a
                onClick={prevPage}
                className="px-3 py-1.5 text-sm text-black transition-all duration-300 hover:bg-black dark:hover:bg-black dark:hover:text-white border rounded-full focus:outline-none focus:ring focus:border-primary-300"
              >
                Prev
              </a>
            </li>
          )}
          {numbers.map((item) => (
            <li key={item}>
              <a
                onClick={() => changePage(item)}
                className={`${
                  currentPage === item
                    ? "bg-primary-100 text-red-500 font-medium"
                    : "text-black hover:bg-black dark:hover:bg-black dark:hover:text-white"
                } px-3 py-1.5 text-sm border rounded-full transition-all duration-300 focus:outline-none focus:ring focus:border-primary-300`}
              >
                {item}
              </a>
            </li>
          ))}
          {currentPage !== totalPages && (
            <li>
              <a
                onClick={nextPage}
                className="px-3 py-1.5 text-sm text-black transition-all duration-300 hover:bg-black dark:hover:bg-black dark:hover:text-white border rounded-full focus:outline-none focus:ring focus:border-primary-300"
              >
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
