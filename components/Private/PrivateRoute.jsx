'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  return token ? children : null;
};

export default PrivateRoute;

