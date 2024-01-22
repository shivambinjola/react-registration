import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Stack,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const Sex = [
  { text: "Male", value: "male" },
  { text: "Female", value: "female" },
];

const UserRegisterForm = () => {
  // const [namestate, setNamestate] = useState("");

  const schema = yup
    .object({
      name: yup.string().required("Name is required"),
      age: yup.number().required().positive().integer("age is required"),
      sex: yup.string().required("sex is required"),
      mobile: yup
        .string()
        .matches(
          /^[789]\d{9}$/,
          "Invalid mobile number Please enter Indian number"
        ),
      idType: yup.string().required(""),
      govtid: yup
        .string()
        .required("")
        .when("idType", {
          is: "Aadhar",
          then: (schema) =>
            schema.max(12).matches(/^[2-9]\d{9}$/, "Invalid number"),
          otherwise: (schema) =>
            schema
              .max(10)
              .matches(/^[a-zA-Z0-9]*$/, "Invalid alpha-numeric string"),
        }),
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
    const isValid = await schema.isValid(values);
    // console.log("isv", isValid);
    if (isValid === true) {
      const userPersonalInfo = {
        name: values.name,
        age: values.age,
        sex: values.sex,
        mobile: values.mobile,
        idType: values.idType,
        govtId: values.govtid,
      };

      localStorage.setItem("isvalid", isValid);
      // console.log("upi", userPersonalInfo);
      localStorage.setItem(
        "userPersonalInfo",
        JSON.stringify(userPersonalInfo)
      );

      window.location.reload();
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div className="bg-blue-400 pt-20 text-center">
        <h1 className="text-6xl text-white font-bold font-sans ">
          Personal Details
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
        <h2 className="text-2xl">Personal Details</h2>
        <Stack spacing={2} width={400}>
          <div className="">
            <InputLabel id="name">
              Name<span className="text-red-500">*</span>
            </InputLabel>
            <TextField
              fullWidth
              placeholder="Enter Name"
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="">
            <InputLabel id="age">
              Date of Birth or Age<span className="text-red-500">*</span>
            </InputLabel>
            <TextField
              fullWidth
              placeholder="DD/MM/YYYY or Age in Years"
              type="text"
              {...register("age", { required: true })}
            />
            {errors.age && (
              <span className="text-sm text-red-500">
                {"Age must be a `number` type,"}
              </span>
            )}
          </div>

          <div className="">
            <InputLabel id="sex">
              Sex<span className="text-red-500">*</span>
            </InputLabel>
            <Select fullWidth placeholder="Select Sex" {...register("sex")}>
              {Sex.map((option, id) => (
                <MenuItem key={id} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </Select>
            {errors.sex && (
              <span className="text-sm text-red-500">{errors.sex.message}</span>
            )}
          </div>
          <div className="">
            <InputLabel id="mobile">
              Mobile<span className="text-red-500">*</span>
            </InputLabel>
            <TextField
              fullWidth
              placeholder="Enter Mobile"
              type="number"
              {...register("mobile", { required: true })}
            />
            {errors.mobile && (
              <span className="text-sm text-red-500">
                {errors.mobile.message}
              </span>
            )}
          </div>
          <div className=" mb-20">
            <InputLabel id="govtissueid">
              Govt Issued ID<span className="text-red-500">*</span>
            </InputLabel>
            <div className="flex space-x-5">
              <div>
                <Select placeholder="ID Type" {...register("idType")}>
                  <MenuItem value="Aadhar">Aadhar</MenuItem>
                  <MenuItem value="PAN">PAN</MenuItem>
                </Select>
                <br />
                {errors.govtid && (
                  <span className="text-sm text-red-500 absolute">
                    {errors.govtid.message}
                  </span>
                )}
              </div>
              <div>
                <TextField
                  placeholder="Enter Govt ID"
                  type="number"
                  //   width={100}
                  {...register("govtid", { required: true })}
                />
                <br />
                {errors.idType && (
                  <span className="text-sm text-red-500">
                    {errors.idType.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <Button className="" variant="contained" type="submit">
            Next
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default UserRegisterForm;
