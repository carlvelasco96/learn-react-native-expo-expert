import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

function renderExpenseItem(itemData: any) {
  return <Text>{itemData.item.description}</Text>;
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
