import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../slices/authSlice";

import StyledForm from "../ui/StyledForm";
import H1 from "../ui/H1";
import Label from "../ui/Label";
import Input from "../ui/Input";
import FormErrorMessage from "../ui/FormErrorMessage";
import Button from "../ui/Button";

function LoginForm({ setSignupFormToggle }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { error, isLoadingAuth } = useSelector((store) => store.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
    setUsername("");
    setPassword("");
  };
  return (
    <StyledForm fillFor="auth">
      <H1>Login</H1>
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
      <Button
        size="medium"
        variation="primary"
        type="submit"
        onClick={handleLogin}
        disabled={isLoadingAuth}
      >
        {isLoadingAuth ? "Logging in..." : "Login"}
      </Button>
      <Button
        disabled={isLoadingAuth}
        onClick={(e) => {
          e.preventDefault();
          setSignupFormToggle(true);
        }}
      >
        To signup form &raquo;
      </Button>
    </StyledForm>
  );
}

export default LoginForm;
