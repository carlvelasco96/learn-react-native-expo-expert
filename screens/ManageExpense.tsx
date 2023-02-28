import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useContext } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootNativeStackParamList } from "../utils/definitions/navigation";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

type Props = NativeStackScreenProps<RootNativeStackParamList, "ManageExpense">;
const ManageExpense = ({ route, navigation }: Props) => {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId!);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(values: {
    amount: number;
    date: Date;
    description: string;
  }) {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId!, values);
    } else {
      expensesCtx.addExpense(values);
    }
    navigation.goBack();
  }

  const editedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  const defaultValues = {
    amount: editedExpense?.amount.toString() || "",
    date: editedExpense?.date.toISOString().split("T")[0] || "",
    description: editedExpense?.description || "",
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValues={defaultValues}
        isEditing={isEditing}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
