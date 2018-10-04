import React from "react";
import { Text } from "react-native-paper";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const StepSwitcher = props => {
  return (
    <View style={styles.StepSwitcher}>
      <View style={styles.Container}>
        <TouchableOpacity
          style={
            props.activeStep === 1 ? styles.ActiveStep : styles.InactiveStep
          }
          onPress={() => props.switchSteps(1)}
        >
          <Text style={props.activeStep === 1 ? styles.ActiveText : {}}>
            Step 1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Switches}
          onPress={() => props.switchSteps(2)}
          style={
            props.activeStep === 2 ? styles.ActiveStep : styles.InactiveStep
          }
        >
          <Text style={props.activeStep === 2 ? styles.ActiveText : {}}>
            Step 2
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

StepSwitcher.propTypes = {
  switchSteps: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  StepSwitcher: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 25
  },
  Container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#000000",
    borderRadius: 20,
    width: "60%",
    height: 35
  },
  ActiveStep: {
    backgroundColor: "#1271E0",
    borderRadius: 20,
    flex: 1,
    height: 35,
    justifyContent: "center",
    alignItems: "center"
  },
  InactiveStep: {
    borderRadius: 20,
    flex: 1,
    height: 35,
    justifyContent: "center",
    alignItems: "center"
  },
  ActiveText: {
    color: "white"
  }
});

export default StepSwitcher;
