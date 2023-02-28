import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";

type Props = {
  defaultValues?: {
    amount: string;
    date: string;
    description: string;
  };
  isEditing: boolean;
  onCancel: () => void;
  onSubmit: (values: {
    amount: number;
    date: Date;
    description: string;
  }) => void;
};

const ExpenseForm = ({
  defaultValues = {
    amount: "",
    date: "",
    description: "",
  },
  isEditing,
  onCancel,
  onSubmit,
}: Props) => {
  const [inputValues, setInputValues] = useState(defaultValues);

  function inputChangeHandler(
    inputIdentifier: "amount" | "date" | "description",
    enteredValue: string
  ) {
    setInputValues((prevState) => {
      return { ...prevState, [inputIdentifier]: enteredValue };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    const amountIsValid = isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert("Invalid input", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }

    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 25,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: { flex: 1 },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
