import { CustomTabs } from "@/components/CustomTabs";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const _layout = () => {
  return (
    <Tabs tabBar={CustomTabs} screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarAccessibilityLabel: "Home Screen",
          tabBarButtonTestID: "tab-button-home",
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarAccessibilityLabel: "Wallet Screen",
          tabBarButtonTestID: "tab-button-wallet",
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          tabBarAccessibilityLabel: "Statistics Screen",
          tabBarButtonTestID: "tab-button-statistics",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarAccessibilityLabel: "Profile Screen",
          tabBarButtonTestID: "tab-button-profile",
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
