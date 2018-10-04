import React from "react";
import { Text, Title, Card, Button, HelperText } from "react-native-paper";
import {
  DatePickerAndroid,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert
} from "react-native";
import InputContainer from "./InputContainer";
import PropTypes from "prop-types";
import moment from "moment";

const InvoiceCreationForm = props => {
  const openDatePicker = async fieldName => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: moment(props[fieldName]).toDate()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        props.handleChange(fieldName, moment(new Date(year, month, day)));
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  const handleSubmit = () => {
    if (props.validateAll()) {
      Alert.alert("Form Valid");
    } else {
      Alert.alert(
        "Form Invalid",
        "There are some problems with the fields. Please go back and fix them"
      );
    }
  };
  return (
    <Card style={styles.Card}>
      <View style={styles.Form}>
        <View style={styles.Title}>
          <Title>CREATE AN INVOICE</Title>
        </View>
        <Text> INVOICE NAME*</Text>
        <InputContainer>
          <TextInput
            value={props.invoiceName}
            onChangeText={text => props.handleChange("invoiceName", text)}
          />
        </InputContainer>
        <HelperText type="error" visible={props.errors.invoiceName}>
          {props.errors.invoiceName}
        </HelperText>

        <Text> ISSUE DATE*</Text>
        <TouchableOpacity onPress={() => openDatePicker("issueDate")}>
          <InputContainer>
            <Text>
              {props.issueDate
                ? moment(props.issueDate).format("MMM Do YY")
                : null}
            </Text>
          </InputContainer>
        </TouchableOpacity>
        <HelperText
          type="error"
          visible={props.errors.issueDate || props.errors.commonDateError}
        >
          {props.errors.issueDate
            ? props.errors.issueDate
            : props.errors.commonDateError
              ? props.errors.commonDateError
              : null}
        </HelperText>

        <Text> REPAYMENT DATE*</Text>
        <TouchableOpacity onPress={() => openDatePicker("repaymentDate")}>
          <InputContainer>
            <Text>
              {props.repaymentDate
                ? moment(props.repaymentDate).format("MMM Do YY")
                : null}
            </Text>
          </InputContainer>
        </TouchableOpacity>
        <HelperText
          type="error"
          visible={props.errors.repaymentDate || props.errors.commonDateError}
        >
          {props.errors.repaymentDate
            ? props.errors.repaymentDate
            : props.errors.commonDateError
              ? props.errors.commonDateError
              : null}
        </HelperText>

        <Text> AMOUNT*</Text>
        <InputContainer>
          <TextInput
            value={props.invoiceAmount}
            onChangeText={text => props.handleChange("invoiceAmount", text)}
          />
        </InputContainer>
        <HelperText type="error" visible={props.errors.invoiceAmount}>
          {props.errors.invoiceAmount}
        </HelperText>
        <View style={styles.ButtonContainer}>
          <Button
            mode="contained"
            style={styles.Buttons}
            onPress={handleSubmit}
            theme={{ roundness: 20 }}
          >
            Submit
          </Button>
        </View>
        <View style={styles.ButtonContainer}>
          <Button
            mode="contained"
            style={styles.Buttons}
            icon="arrow-back"
            onPress={() => props.switchSteps(1)}
            theme={{ roundness: 20 }}
          >
            Previous
          </Button>
        </View>
      </View>
    </Card>
  );
};

InvoiceCreationForm.propTypes = {
  invoiceName: PropTypes.string,
  invoiceAmount: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  switchSteps: PropTypes.func.isRequired,
  errors: PropTypes.object,
  validateAll: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  Card: {
    margin: 10
  },
  Form: {
    margin: 5
  },
  Buttons: {
    margin: 10,
    width: "60%"
  },
  ButtonContainer: {
    alignItems: "center"
  },
  Title: {
    alignItems: "center"
  }
});

export default InvoiceCreationForm;
