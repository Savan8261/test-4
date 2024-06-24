import styled, { css } from "styled-components";

const fillfor = {
  auth: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    border: 2px solid #888d91;
    border-radius: 15px;
    background-color: #888d91;
    color: white;
    min-height: 80%;
    min-width: 40vh;
    padding: 50px;
  `,
  add: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 30px;
    background-color: #7c8287;
    max-height: 400px;
  `,
};

const StyledForm = styled.form`
  ${(props) => fillfor[props.fillFor]}
`;

// StyledForm.defaultProps = {
//   page: "auth",
// };

export default StyledForm;
