import styled, { css } from "styled-components";

const pages = {
  home: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 100vh;
  `,
  app: css`
    display: flex;
    flex-direction: row;
    min-width: 100vh;
  `,
};

const Container = styled.div`
  ${(props) => pages[props.page]}
`;

Container.defaultProps = {
  page: "home",
};

export default Container;
