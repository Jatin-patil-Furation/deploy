
  // import { useRouter } from "next/navigation"; 

  // const PrivateRoute= ({ children }) => {
  //   const router = useRouter()
  //   const userdata = JSON.parse(localStorage.getItem("token"))
  //   const Authenticate = userdata ? true :false;

  //   return Authenticate ? children  : router.push("/login");
  // };

  // export default PrivateRoute;


  import { useEffect } from 'react';
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const Authenticate = typeof window !== 'undefined' ? !!localStorage.getItem('token') : false;

  useEffect(() => {
    if (!Authenticate) {
      router.push('/login');
    }
  }, [Authenticate, router]);

  return Authenticate ? children : null;
};

export default PrivateRoute;

