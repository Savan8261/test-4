import styled, { css } from "styled-components";

const pages = {
  home: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #0f3659;
    color: white;
    min-width: 100%;
    padding: 30px;
  `,
  app: css`
    background-color: #0f3659;
    min-height: 10vh;
    min-width: 80vw;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0px 20px;
  `,
};

const Header = styled.header`
  ${(props) => pages[props.page]}
`;

Header.defaultProps = {
  page: "home",
};

export default Header;
