import { colors, radius, spacingX } from "@/constants/theme";
import { InputProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = InputProps & {
  error?: string;
};

const Input = (props: Props) => {
  return (
    <View style={{ gap: 5 }}>
      <View
        style={[
          styles.container,
          props.containerStyle,
          props.error && { borderColor: colors.rose },
        ]}
      >
        {props.icon && props.icon}
        <TextInput
          style={[styles.input, props.inputStyle]}
          placeholderTextColor={colors.neutral400}
          ref={props.inputRef}
          {...props}
        />
      </View>
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: verticalScale(54),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
    gap: spacingX._10,
  },
  input: {
    flex: 1,
    fontSize: verticalScale(14),
    color: colors.white,
  },
  errorText: {
    color: colors.rose,
    fontSize: verticalScale(12),
    marginLeft: spacingX._5,
  },
});
