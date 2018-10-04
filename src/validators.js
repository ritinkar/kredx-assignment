import moment from "moment";
const validators = {
  dealName: ({ dealName }) => {
    if (!dealName) {
      return "Deal name can't be empty";
    }
    if (!/^[_a-zA-Z\s]+$/g.test(dealName)) {
      return "Deal name must not contain special charecters or numbers";
    }
    return null;
  },
  dealDate: ({ dealDate }) => {
    if (!dealDate) {
      return "Deal date can't be empty";
    }
    if (
      dealDate &&
      moment()
        .add(1, "day")
        .startOf("day") <= dealDate
    ) {
      return "Deal date can't be in the future";
    }

    return null;
  },
  dealAmount: ({ dealAmount, invoiceAmount }) => {
    if (!dealAmount) {
      return "Deal Amount can't be empty";
    }
    if (!(!isNaN(parseFloat(dealAmount)) && isFinite(dealAmount))) {
      return "Enter Valid Deal Amount";
    }
    if (invoiceAmount && Number(invoiceAmount) < Number(dealAmount)) {
      return "Deal amount Must be Lower than Invoice Amount ";
    }
    return null;
  },
  invoiceName: ({ invoiceName }) => {
    if (!invoiceName) {
      return "Invoice Name can't be empty";
    }
    if (!/^[_a-zA-Z\s]+$/g.test(invoiceName)) {
      return "Invoice Name must not contain special charecters or numbers";
    }
    return null;
  },
  issueDate: ({ issueDate }) => {
    if (!issueDate) {
      return "Issue date can't be empty";
    }
    if (
      issueDate &&
      moment()
        .add(1, "day")
        .startOf("day") <= issueDate
    ) {
      return "Issue Date can't be in the future";
    }

    return null;
  },
  repaymentDate: ({ repaymentDate, issueDate }) => {
    if (!repaymentDate) {
      return "Repayment date can't be empty";
    }
    if (repaymentDate && moment().startOf("day") > repaymentDate) {
      return "Repayment Date can't be in the past";
    }
    if (
      repaymentDate &&
      issueDate &&
      moment(repaymentDate).startOf("day") <= moment(issueDate).startOf("day")
    ) {
      return "Repayment Date can't be before or on issue date";
    }
  },
  invoiceAmount: ({ invoiceAmount, dealAmount }) => {
    if (!invoiceAmount) {
      return "Invoice Amount can't be empty";
    }
    if (!(!isNaN(parseFloat(invoiceAmount)) && isFinite(invoiceAmount))) {
      return "Enter Valid Invoice Amount";
    }
    if (Number(invoiceAmount) < Number(dealAmount)) {
      return "Invoice Amount Must be Higher than Deal amount";
    }

    return null;
  },
  CommonDateValidator: ({ repaymentDate, issueDate, dealDate }) => {
    if (
      issueDate &&
      repaymentDate &&
      dealDate &&
      (dealDate >= repaymentDate || dealDate <= issueDate)
    ) {
      return "Deal date must be between issue date and repayment date";
    }
    return null;
  }
};

export default validators;
