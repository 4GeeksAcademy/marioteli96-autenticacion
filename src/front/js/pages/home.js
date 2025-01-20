import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Login } from "../component/login";
import { Signup } from "../component/signup";


export const Home = () => {
  return (
    <div className="text-center mt-5">
      <Login/>
      <Signup/>
   
    </div>
  );
};
