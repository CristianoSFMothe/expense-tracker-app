import { colors, radius } from "@/constants/theme";
import { CustomButtonProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import React from "react";
import {
  AccessibilityProps,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Loading from "./Loading";

type Props = CustomButtonProps &
  AccessibilityProps & {
    testID?: string;
    accessibilityLabel?: string;
    onPress?: (event: GestureResponderEvent) => void;
  };

const Button = ({
  style,
  onPress,
  loading = false,
  children,
  testID,
  accessibilityLabel,
  ...rest
}: Props) => {
  if (loading) {
    return (
      <View
        style={[styles.button, style, { backgroundColor: "transparent" }]}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        {...rest}
      >
        <Loading />
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius._17,
    borderCurve: "continuous",
    height: verticalScale(52),
    justifyContent: "center",
    alignItems: "center",
  },
});
