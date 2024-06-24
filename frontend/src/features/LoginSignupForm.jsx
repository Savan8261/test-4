import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";

function LoginSignupForm() {
  const [signupFormToggle, setSignupFormToggle] = useState(false);

  const fetchedAuth = useSelector((store) => store.auth);
  const { user } = fetchedAuth;

  const navigate = useNavigate();

  useEffect(
    function () {
      if (user?.role) {
        if (user.role === "admin") {
          navigate("/admin");
        } else if (user.role === "user") {
          navigate("/user");
        } else {
          navigate("/home");
        }
      }
    },
    [navigate, user]
  );

  return (
    <>
      {!signupFormToggle && (
        <LoginForm setSignupFormToggle={setSignupFormToggle} />
      )}
      {signupFormToggle && (
        <SignupForm setSignupFormToggle={setSignupFormToggle} />
      )}
    </>
  );
}

export default LoginSignupForm;
