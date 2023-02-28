import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
} from "react-native";
import React from "react";

type Props = {
  label: string;
  textInputConfig?: TextInputProps;
};

const Input = ({ label, textInputConfig }: Props) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput {...textInputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
