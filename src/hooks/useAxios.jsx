import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useAxios = () => {
  const navigate = useNavigate()
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
  });
  const { signOutUser } = useAuth();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.status === 401 || error.status === 403) {
          signOutUser()
            .then(() => console.log("logged out user as you are unauthorized"))
            .catch((e) => console.log(e));
          navigate('/signIn')
        }
        return Promise.reject(error);
      }
    );
  }, []);
  return axiosInstance;
};

export default useAxios;
