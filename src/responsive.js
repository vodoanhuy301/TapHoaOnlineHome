import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media (max-width: 575.98px) {
      ${props}
    }
  `;
};
export const mediumMobile = (props) => {
  return css`
    @media (max-width: 767.98px) {
      ${props}
    }
  `;
};
export const largeDevice = (props) => {
  return css`
    @media  (max-width: 991.98px) {
      ${props}
    }
  `;
};
export const  XlargeDevice = (props) => {
  return css`
    @media (max-width: 1199.98px) {
      ${props}
    }
  `;
};