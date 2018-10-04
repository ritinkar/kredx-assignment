import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import App from "./App";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1271E0",
    accent: "#f1c40f"
  }
};

const Main = () => {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
};

export default Main;
