import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Image from "../assets/image.png";
import { useGoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import usePost from "../hooks/usePost";
import Loading from "../components/general/Loading";

// import { AuthConecction } from '../services/AuthServices';
// import { GetUserData } from '../services/UserServices';

const Login = () => {
  const navigateTo = useNavigate();
  const { saveToken, saveUser, removeData } = useContext(AuthContext);
  const { post, isLoading } = usePost(`${import.meta.env.VITE_BASE_URL}/auth/login`);

  // if (isLoading) return <p>Loading...</p>;

  const credentialResponse = async (response) => {
    try {
      const { access_token } = response;
      const tokenAuth = {
        googleToken: access_token,
      };


      const res = await post(tokenAuth);
      saveToken(res.token);
      // getUserData();
      navigateTo("/home");
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
      });
    }
  };

  // if (isLoading) return <p>Cargando...</p>

  const loginF = useGoogleLogin({
    onSuccess: credentialResponse,
    onError: (error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${error}`,
        showConfirmButton: false,
      });
      console.log("Login Failed:", error);
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center p-6">
        <Loading />
      </div>
    );
  }

  return (

    <div className="w-full h-screen flex justify-center items-center p-6">
      <div className="flex flex-col items-center justify-center gap-2 h-fit w-full ">

        <div className="px-8  py-4 md:w-5/12">
          <img src={Image} alt="logo" className="w-full" />
        </div>

        <div className="flex flex-col  items-center justify-center  w-full md:w-fit ">
          <h2 className="font-bold text-4xl font-poppins">Welcome back</h2>
          <p className="text-sm pb-4">sign in to your account to Continue</p>
          <button
            className="bg-white font-poppins rounded-md flex justify-center items-center font-medium text-sm border-solid border-2 w-[200px] h-[40px] lg:w-[280px] lg:h-[55px] lg:text-xl"
            onClick={() => loginF()}
          >
            <FcGoogle className=" mr-1 size-6 lg:size-10" />
            Continue with Google
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;
