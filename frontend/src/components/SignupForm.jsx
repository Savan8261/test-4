import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signup } from "../slices/authSlice";

import Button from "../ui/Button";
import FormErrorMessage from "../ui/FormErrorMessage";
import H1 from "../ui/H1";
import Input from "../ui/Input";
import Label from "../ui/Label";
import StyledForm from "../ui/StyledForm";

function SignupForm({ setSignupFormToggle }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const fetchedAuth = useSelector((store) => store.auth);
  const { error, isLoadingAuth } = fetchedAuth;

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(signup({ username, password }));
  };

  return (
    <StyledForm fillFor="auth">
      <H1>Signup</H1>
      <Label htmlFor="username">Username</Label>
      <Input
        type="text"
        id="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        placeholder="Username"
        disabled={isLoadingAuth}
      />
      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
        disabled={isLoadingAuth}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}

      <Button disabled={isLoadingAuth} onClick={handleSignup}>
        {isLoadingAuth ? "Signining..." : "Signup"}
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          setSignupFormToggle(false);
        }}
      >
        To login form &raquo;
      </Button>
    </StyledForm>
  );
}

export default SignupForm;
