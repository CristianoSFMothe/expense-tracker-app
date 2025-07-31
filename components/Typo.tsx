import { colors } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import React from "react";
import {
  TextProps as RNTextProps,
  StyleSheet,
  Text,
  TextStyle,
} from "react-native";

type TypoProps = {
  size?: number;
  color?: string;
  fontWeight?: TextStyle["fontWeight"];
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
} & RNTextProps; // <- Aqui está o segredo

const Typo = ({
  size,
  color = colors.text,
  fontWeight = "400",
  children,
  style,
  ...textProps // <- Aqui espalhamos todas as props extras
}: TypoProps) => {
  const textStyle: TextStyle = {
    fontSize: size ? verticalScale(size) : verticalScale(18),
    color,
    fontWeight,
  };

  return (
    <Text style={[textStyle, style]} {...textProps}>
      {children}
    </Text>
  );
};

export default Typo;

const styles = StyleSheet.create({});
