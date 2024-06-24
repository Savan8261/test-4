import styled, { css } from "styled-components";

const pages = {
  home: css`
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-width: 100vw;
    min-height: 75vh;
  `,
  app: css`
    display: flex;
    flex-direction: column;
  `,
};

const Main = styled.main`
  ${(props) => pages[props.page]}
`;

Main.defaultProps = {
  page: "home",
};

export default Main;
