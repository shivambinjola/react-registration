import React, { lazy, Suspense } from "react";
import UserRegisterForm from "./userRegisterForm";
import UserRegistrationFromSec from "./userRegistrationFromSec";
import { useEffect } from "react";
import { add } from "../redux/userslice";
import { useDispatch, useSelector } from "react-redux";
// import DataTable from "./DataTable";
const DataTable = lazy(() => import("./DataTable"));

const HomePage = () => {
  //   const userdata = useSelector((state) => {
  //     return state;
  //   });
  //   console.log("first", userdata);
  const isvalid = localStorage.getItem("isvalid");
  const isvalidaddress = localStorage.getItem("isValidaddress");
  const upi = localStorage.getItem("userPersonalInfo") as string;
  const uai = localStorage.getItem("userAddressInfo") as string;
  const obj1 = JSON.parse(upi);
  const obj2 = JSON.parse(uai);
  // console.log(JSON.parse(upi));
  // console.log(JSON.parse(uai));
  // console.log("isvalid", isvalid);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      add({
        name: obj1?.name,
        age: obj1?.age,
        sex: obj1?.sex,
        mobile: obj1?.mobile,
        idType: obj1?.idType,
        govtid: obj1?.govtId,
        address: obj2?.address,
        state: obj2?.state,
        city: obj2?.city,
        country: obj2?.country,
        pincode: obj2?.address,
      })
    );
  });
  return (
    <main>
      {isvalid === null || isvalid == "false" ? (
        <UserRegisterForm />
      ) : isvalidaddress === null || isvalidaddress == "false" ? (
        <UserRegistrationFromSec />
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <DataTable />
        </Suspense>
      )}
    </main>
  );
};

export default HomePage;
