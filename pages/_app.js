import React, { useContext } from "react";
import { ThemeProvider } from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import ColorModeProvider, { ColorModeContext } from "../src/components/Menu/components/ColorMode";
import RegisterVideo from "../src/components/RegisterVideo";
import { theme } from "../src/common/theme";

// _app.js -> Definições globais do NextJS
// ThemeProvider -> Prover o tema para a app toda
// ColorModeProvider -> Prove o state de light ou dark mode para todo mundo 

function ProviderWrapper(props) {
  return (
    <ColorModeProvider initialMode={"dark"}>
      {props.children}
    </ColorModeProvider>
  )
}

function Root({ Component, pageProps }) {
  const context = useContext(ColorModeContext);
  
  return (
    <ThemeProvider theme={theme[context.mode]}>
      <CSSReset />
      <Component {...pageProps} />
      <RegisterVideo />
    </ThemeProvider>
  )
}

export default function _App(props) {
  return (
    <ProviderWrapper>
      <Root {...props} />
    </ProviderWrapper>
  )
};