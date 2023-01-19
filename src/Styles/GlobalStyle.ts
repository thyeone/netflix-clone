import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');

${reset};

* {
  box-sizing: border-box;
}
body {
  /* font-family: 'Source Sans Pro', sans-serif; */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #000;
  color:${(props) => props.theme.white.darker};
  }
 a {
    text-decoration : none;
    color: inherit;
  }
`;
