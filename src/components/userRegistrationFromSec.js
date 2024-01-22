import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  TextField,
  Button,
  Stack,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const UserRegistrationFromSec = () => {
  const [countrydata, setCountrydata] = useState([]);

  const navigate = useNavigate();
  //   console.log("nav", navigate);
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountrydata(res?.data);
        // console.log("res", res?.data?.sort());
      })
      .catch((err) => console.log(err));
  }, []);

  const schema = yup
    .object({
      address: yup.string(),
      state: yup.string(),
      city: yup.string(),
      country: yup.string(),
      pincode: yup.number(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // console.log("err", errors);

  const onSubmit = async (values) => {
    // console.log("values", values);
    const isValidaddress = await schema.isValid(values);
    // console.log("isv", isValidaddress);
    if (isValidaddress === true) {
      const userAddressInfo = {
        address: values.address,
        state: values.state,
        city: values.city,
        country: values.country,
        pincode: values.pincode,
      };
      //   setState(true);
      // console.log("uai", userAddressInfo);
      localStorage.setItem("userAddressInfo", JSON.stringify(userAddressInfo));
      localStorage.setItem("isValidaddress", isValidaddress);
      //   console.log(Router({ navigator }));
      window.location.reload();
      //   navigate("/datatable");
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div className="bg-blue-400 pt-20 text-center">
        <h1 className="text-6xl text-white font-bold font-sans ">
          Address Details
        </h1>
        <h3 className="text-white  font-sans ">
          Please fill the all nessesary details
        </h3>
        <img
          className="w-96 h-96 flex mx-auto mt-20"
          src="/personal-details.png"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 h-[100vh] flex flex-col justify-center items-center"
      >
        <h2 className="text-2xl">Address Details</h2>

        <Stack spacing={2} width={300}>
          <div className="">
            <InputLabel id="address">Address</InputLabel>
            <TextField
              fullWidth
              placeholder="Enter Address"
              type="text"
              {...register("address")}
            />
          </div>
          <div className="">
            <InputLabel id="state">State</InputLabel>
            <TextField
              fullWidth
              placeholder="Enter State"
              type="text"
              {...register("state")}
            />
          </div>
          <div className="">
            <InputLabel id="address">City</InputLabel>
            <TextField
              fullWidth
              placeholder="Enter City"
              type="text"
              {...register("city")}
            />
          </div>
          <div className="">
            <InputLabel id="country">Country</InputLabel>
            <Select
              fullWidth
              placeholder="Select Country"
              {...register("country")}
            >
              {countrydata.sort().map((option, id) => (
                <MenuItem key={id} value={option?.name?.common}>
                  {option?.name?.common}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="">
            <InputLabel id="pincode">Pincode</InputLabel>
            <TextField
              fullWidth
              placeholder="Enter Pincode"
              type="number"
              {...register("pincode")}
            />
          </div>
          {errors.pincode && (
            <span className="text-sm text-red-500">
              pincode must be a number
            </span>
          )}
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default UserRegistrationFromSec;
