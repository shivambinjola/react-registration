import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  age: "",
  sex: "",
  mobile: "",
  idType: "",
  govtid: "",
  address: "",
  state: "",
  city: "",
  country: "",
  pincode: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    add: (state, user) => {
      // console.log(user);
      let userdata = JSON.stringify(user.payload);
      localStorage.setItem("user", userdata);
      return user.payload;
    },
    remove: () => {
      return initialState;
    },
  },
});

export const { add, remove } = userSlice.actions;

// export const getAuthState = createSelector(
//   (state) => state
//   // ({ auth }) => auth
// );

export default userSlice.reducer;
