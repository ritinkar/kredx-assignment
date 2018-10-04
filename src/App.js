import React from "react";
import { createDrawerNavigator } from "react-navigation";
import FormContainer from "./components/FormContainer";
import DrawerItems from "./components/DrawerItems";

const App = createDrawerNavigator(
  {
    Form: {
      screen: FormContainer
    }
  },
  {
    contentComponent: () => <DrawerItems />
  }
);

export default App;
