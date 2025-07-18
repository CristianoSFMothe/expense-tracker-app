import Button from "@/components/Button";
import Typo from "@/components/Typo";
import { auth } from "@/config/firebase";
import { colors } from "@/constants/theme";
import { signOut } from "firebase/auth";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const handleLogout = async () => {
  await signOut(auth);
};

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Button onPress={handleLogout}>
        <Typo color={colors.black}>Sair</Typo>
      </Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
