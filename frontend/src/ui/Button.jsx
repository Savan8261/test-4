import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
    text-align: center;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
    cursor: pointer;
  `,
};

const variations = {
  primary: css`
    color: white;
    background-color: #0f3659;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #375168;
    }
    &:focus {
      border: none;
      outline: none;
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--color-grey-50);
    }
    &:focus {
      border: none;
      outline: none;
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--color-red-800);
    }
    &:focus {
      border: none;
      outline: none;
    }
  `,
  exit: css`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;

    &:hover {
      background-color: var(--color-grey-100);
    }

    & svg {
      width: 2.4rem;
      height: 2.4rem;
      /* Sometimes we need both */
      /* fill: var(--color-grey-500);
   stroke: var(--color-grey-500); */
      color: var(--color-grey-500);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
