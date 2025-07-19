import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { auth } from "@/config/firebase";
import { colors } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { signOut } from "firebase/auth";
import React from "react";
import { StyleSheet } from "react-native";

const handleLogout = async () => {
  await signOut(auth);
};

const Home = () => {
  const { user } = useAuth();

  console.log("user", user);

  return (
    <ScreenWrapper>
      <Typo>Home</Typo>
      <Button onPress={handleLogout}>
        <Typo color={colors.black}>Sair</Typo>
      </Button>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
