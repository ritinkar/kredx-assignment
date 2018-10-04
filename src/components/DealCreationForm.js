import React from "react";
import {
  Text,
  Title,
  Card,
  Button,
  HelperText,
  List
} from "react-native-paper";
import {
  DatePickerAndroid,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import InputContainer from "./InputContainer";
import PropTypes from "prop-types";
import moment from "moment";

const DealCreationForm = props => {
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
  const InvoieAccordion =
    props.issueDate && props.repaymentDate && props.invoiceAmount ? (
      <List.Accordion title="Values in Invoice Form">
        <Card style={styles.InvoiceContent}>
          <List.Item
            title="Issue Date*"
            description={moment(props.issueDate).format("MMM Do YY")}
          />
          <List.Item
            title="Repayment Date*"
            description={moment(props.repaymentDate).format("MMM Do YY")}
          />
          <List.Item title="Amount*" description={props.invoiceAmount} />
        </Card>
      </List.Accordion>
    ) : null;
  return (
    <Card style={styles.Card}>
      <View style={styles.Form}>
        {InvoieAccordion}
        <View style={styles.Title}>
          <Title>CREATE A DEAL</Title>
        </View>
        <Text> NAME*</Text>
        <InputContainer>
          <TextInput
            value={props.dealName}
            onChangeText={text => props.handleChange("dealName", text)}
          />
        </InputContainer>
        <HelperText type="error" visible={props.errors.dealName}>
          {props.errors.dealName}
        </HelperText>
        <Text> DATE*</Text>
        <TouchableOpacity onPress={() => openDatePicker("dealDate")}>
          <InputContainer>
            <Text>
              {props.dealDate
                ? moment(props.dealDate).format("MMM Do YY")
                : null}
            </Text>
          </InputContainer>
        </TouchableOpacity>
        <HelperText
          type="error"
          visible={props.errors.dealDate || props.errors.commonDateError}
        >
          {props.errors.dealDate
            ? props.errors.dealDate
            : props.errors.commonDateError
              ? props.errors.commonDateError
              : null}
        </HelperText>

        <Text> AMOUNT*</Text>
        <InputContainer>
          <TextInput
            value={props.dealAmount}
            onChangeText={text => props.handleChange("dealAmount", text)}
          />
        </InputContainer>
        <HelperText type="error" visible={props.errors.dealAmount}>
          {props.errors.dealAmount}
        </HelperText>
        <View style={styles.ButtonContainer}>
          <Button
            mode="contained"
            style={styles.Buttons}
            onPress={() => props.switchSteps(2)}
            theme={{ roundness: 20 }}
          >
            Next
          </Button>
        </View>
      </View>
    </Card>
  );
};
DealCreationForm.propTypes = {
  dealName: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  dealAmount: PropTypes.string,
  switchSteps: PropTypes.func.isRequired,
  dealDate: PropTypes.object,
  errors: PropTypes.object,
  issueDate: PropTypes.object,
  invoiceAmount: PropTypes.string,
  repaymentDate: PropTypes.object
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
  },
  InvoiceContent: {
    backgroundColor: "#E1EDFA"
  }
});

export default DealCreationForm;
