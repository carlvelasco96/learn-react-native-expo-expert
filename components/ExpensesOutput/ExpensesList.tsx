import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData: ListRenderItemInfo<any>) {
  return <ExpenseItem {...itemData.item} />;
}

const ExpensesList = ({ expenses }: { expenses: any[] }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
