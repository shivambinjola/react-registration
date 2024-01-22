import React, { useEffect, useState } from "react";
// import DataTables, { Config } from "datatables.net-dt";
import $ from "jquery";
import "datatables.net";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { TableBody } from "@material-ui/core";
import Loading from "./loading";

const DataTable = () => {
  const userdata = useSelector((state) => state?.user);

  const [isloading, setIsloading] = useState(false);

  // const userData = localStorage.getItem("user") as string;
  // const userdata = JSON.parse(userData);
  // console.log("uds", userdata);

  // console.log("store", userdata);
  const uai = localStorage.getItem("userAddressInfo") as string;

  // console.log("uuu", uai);

  const dataSet = [
    [
      userdata?.name,
      userdata?.age,
      userdata?.sex,
      userdata?.mobile,
      userdata?.idType,
      userdata?.govtid,
      userdata?.address,
      userdata?.state,
      userdata?.city,
      userdata?.country,
      userdata?.pincode,
    ],
  ];

  // console.log("dddd", dataSet);

  const $ = require("jquery");
  $.DataTable = require("datatables.net");
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (!!userdata?.address) {
      setIsloading(false);
    } else {
      setIsloading(true);
    }
    $(tableRef.current).DataTable({
      data: dataSet,
      columns: [
        { title: "Name" },
        { title: "Age" },
        { title: "Sex" },
        { title: "Mobile" },
        { title: " Govt ID Type" },
        { title: "Govt ID" },
        { title: "Address" },
        { title: "State" },
        { title: "City" },
        { title: "Country" },
        { title: "Pincode" },
      ],
      // destroy: true,
      // retrieve: true,
      // stateSave: true,
    });
  }, []);
  // console.log("ddddsec", dataSet);
  return (
    <>
      <div className="pt-20">
        <h1 className="text-center text-6xl font-sans font-bold text-blue-500 ">
          DataBase Table
        </h1>
        <p className="text-xl text-center">Hello {userdata?.name}</p>

        <table ref={tableRef} className="display" width="90%"></table>
      </div>
    </>
  );
};

export default DataTable;
