'use client'
import { useRouter } from "next/navigation"; 

const PrivateRoute= ({ children }) => {
  const router = useRouter()
  const userdata = JSON.parse(localStorage.getItem("token"))
  const Authenticate = userdata ? true :false;

  return Authenticate ? children  : router.push("/login");
};

export default PrivateRoute;
