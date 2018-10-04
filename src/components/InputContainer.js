import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const InputContainer = props => {
  return <View style={styles.Container}>{props.children}</View>;
};

InputContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 0.5,
    borderColor: "#000000",
    borderRadius: 2,
    height: 50,
    justifyContent: "center"
  }
});

export default InputContainer;
