import React, { useEffect } from 'react'
import { Navigate } from 'react-router';

const Otp = () => {
  const tokenStorage = localStorage.getItem("token");
  const isVerified = localStorage.getItem("isVerified") === "0";
  return tokenStorage && isVerified ? (
        <div>
      <h1>OTP Page</h1>
      <p>Please enter your OTP to verify your account.</p>
      {/* Add your OTP input form here */}
    </div>
  ) : (
    <Navigate to="/" replace />
  );
}

export default Otp