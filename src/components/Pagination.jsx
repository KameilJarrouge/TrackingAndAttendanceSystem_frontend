import React, { useEffect, useState } from "react";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import { toast } from "react-toastify";
import api from "../api/api";
function Pagination({
  dataUrl = "",
  setData = (f) => f,
  numberPerPage = 12,
  invoke = false,
  logResult = false,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const getInfo = async () => {
    if (dataUrl === "") return;
    let concat = "?";
    if (dataUrl.indexOf("?") !== -1) {
      concat = "&";
    }
    let res = await api.get(dataUrl + concat + "perPage=" + numberPerPage);
    if (logResult) {
      console.log("====================================");
      console.log(res);
      console.log("====================================");
    }
    setCurrentPage(res.data.current_page);
    setNextPage(res.data.next_page_url !== null);
    setPreviousPage(res.data.prev_page_url !== null);
    setData(res.data.data);
  };

  const navigateData = async (next) => {
    // determine page number
    let page = currentPage;
    if (next) {
      if (nextPage) {
        page += 1;
      } else {
        return;
      }
    } else {
      if (previousPage) {
        page -= 1;
      } else {
        return;
      }
    }

    let concat = "?";
    if (dataUrl.indexOf("?") !== -1) {
      concat = "&";
    }

    let res = await api.get(
      dataUrl + concat + "page=" + page + "&perPage=" + numberPerPage
    );
    console.log("====================================");
    console.log(res.data);
    console.log("====================================");
    setCurrentPage(res.data.current_page);
    setNextPage(res.data.next_page_url !== null);
    setPreviousPage(res.data.prev_page_url !== null);
    setData(res.data.data); // ? maybe without the second data
  };

  useEffect(() => {
    getInfo();
  }, [invoke, dataUrl]);

  return (
    <div className="w-full h-full flex flex-row justify-between items-center">
      {/* arrow right */}
      <div className="w-full h-full flex justify-center items-center">
        <GoTriangleRight
          onClick={() => navigateData(true)}
          className="text-6xl cursor-pointer text-primary hover:text-primary_dark transition-all"
        />
      </div>
      {/* indicator */}
      <div className="w-full h-full rounded-md bg-primary text-3xl p-1 text-center text-font flex justify-center items-center">
        {currentPage}
      </div>
      {/* arrow left */}
      <div className="w-full h-full flex justify-center items-center">
        <GoTriangleLeft
          onClick={() => navigateData(false)}
          className="text-6xl cursor-pointer text-primary   hover:text-primary_dark transition-all"
        />
      </div>
    </div>
  );
}

export default Pagination;
