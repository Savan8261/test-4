import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { logout } from "../slices/authSlice";

import styled from "styled-components";

const LogoutContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: white;
  padding: 5px;
  border-radius: 25px;
`;

const UserImage = styled.img`
  max-width: 20px;
  max-height: 20px;
  border: none;
  border-radius: 50%;
`;

const Username = styled.p`
  font-size: 15px;
  color: #0f3659;
`;

const LogoutText = styled.p`
  font-size: 15px;
  color: #ffffff;
  background-color: #0f3659;
  padding: 3px 5px;
  border-radius: 20px;
`;
const Separator = styled.span`
  font-size: 20px;
  color: #0f3659;
  margin-left: 5px;
  margin-right: 5px;
`;

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchedAuth = useSelector((store) => store.auth);
  const { isLoadingAuth, user } = fetchedAuth;

  useEffect(
    function () {
      if (!user.id) {
        navigate("/home");
      }
    },
    [navigate, user]
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Link onClick={handleLogout} to="/home">
      <LogoutContainer>
        {user.role === "admin" && <UserImage src="/admin.jpg" alt="logo" />}
        {user.role === "user" && <UserImage src="/user.jpg" alt="logo" />}
        <Username>{user.username}</Username>
        <Separator> | </Separator>
        <LogoutText>{isLoadingAuth ? "Logging out..." : "Logout"}</LogoutText>
      </LogoutContainer>
    </Link>
  );
}

export default Logout;
