import React from "react";
import { Appbar } from "react-native-paper";
import { KeyboardAvoidingView, StyleSheet, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { DrawerActions } from "react-navigation";
import InvoiceCreationForm from "./InvoiceCreationForm";
import DealCreationForm from "./DealCreationForm";
import StepSwitcher from "./StepSwitcher";
import validators from "../validators";

class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      dealName: "",
      dealAmount: "",
      dealDate: null,
      invoiceName: "",
      issueDate: null,
      repaymentDate: null,
      invoiceAmount: "",
      errors: {}
    };
  }
  handleChange = (fieldName, fieldVal) => {
    this.setState(prevState => {
      return {
        errors: {
          ...prevState.errors,
          [fieldName]: validators[fieldName]({
            ...prevState,
            [fieldName]: fieldVal
          }),
          commonDateError: validators.CommonDateValidator({
            ...prevState,
            [fieldName]: fieldVal
          })
        },
        [fieldName]: fieldVal
      };
    });
  };

  validateAll = () => {
    errors = {
      dealName: validators.dealName(this.state),
      dealAmount: validators.dealAmount(this.state),
      dealDate: validators.dealDate(this.state),
      invoiceName: validators.invoiceName(this.state),
      issueDate: validators.issueDate(this.state),
      repaymentDate: validators.repaymentDate(this.state),
      invoiceAmount: validators.invoiceAmount(this.state),
      commonDateError: validators.CommonDateValidator(this.state)
    };
    if (Object.values(errors).some(val => val != null)) {
      this.setState({ errors });
      return false;
    } else {
      return true;
    }
  };

  switchSteps = step => {
    this.setState({
      step
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.Container}>
        <Appbar.Header>
          <Appbar.Action
            icon="menu"
            onPress={() =>
              this.props.navigation.dispatch(DrawerActions.openDrawer())
            }
          />
          <Appbar.Content title="KredX Deal Creation" />
        </Appbar.Header>
        <ScrollView
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="handled"
        >
          <StepSwitcher
            switchSteps={this.switchSteps}
            activeStep={this.state.step}
          />
          {this.state.step === 1 ? (
            <DealCreationForm
              dealAmount={this.state.dealAmount}
              dealName={this.state.dealName}
              dealDate={this.state.dealDate}
              handleChange={this.handleChange}
              switchSteps={this.switchSteps}
              errors={this.state.errors}
              issueDate={this.state.issueDate}
              invoiceAmount={this.state.invoiceAmount}
              repaymentDate={this.state.repaymentDate}
            />
          ) : (
            <InvoiceCreationForm
              invoiceName={this.state.invoiceName}
              invoiceAmount={this.state.invoiceAmount}
              issueDate={this.state.issueDate}
              repaymentDate={this.state.repaymentDate}
              handleChange={this.handleChange}
              switchSteps={this.switchSteps}
              errors={this.state.errors}
              validateAll={this.validateAll}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1
  }
});

export default FormContainer;
