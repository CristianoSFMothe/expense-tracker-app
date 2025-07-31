import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import TransactionList from "@/components/TransactionList";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import useFechData from "@/hooks/useFechData";
import { TransactionType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import { limit, orderBy, where } from "firebase/firestore";
import * as Icons from "phosphor-react-native";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import HomeCard from "./../../components/HomeCard";

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  const constraints = [
    where("uid", "==", user?.uid),
    orderBy("date", "desc"),
    limit(30),
  ];

  const { data: recentTransactions, loading: transactionLoading } =
    useFechData<TransactionType>("transactions", constraints);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View
          style={styles.header}
          accessibilityLabel="home-header"
          testID="home-header"
        >
          <View
            style={{ gap: 4 }}
            accessibilityLabel="greeting-section"
            testID="greeting-section"
            accessible={true}
          >
            <Typo
              size={16}
              color={colors.neutral400}
              accessibilityLabel="greeting-label"
              testID="greeting-label"
            >
              Olá,
            </Typo>
            <Typo
              size={20}
              fontWeight={"500"}
              accessibilityLabel={user?.name || "greeting-username"}
              testID={user?.name || "greeting-username"}
            >
              {user?.name}
            </Typo>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/(modals)/searchModal")}
            style={styles.searchIcon}
            testID="open-search-modal-button"
            accessibilityLabel="open-search-modal-button"
          >
            <Icons.MagnifyingGlassIcon
              size={verticalScale(22)}
              color={colors.neutral200}
              weight="bold"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
        >
          {/* card */}
          <View>
            <HomeCard />
          </View>

          <TransactionList
            data={recentTransactions}
            loading={transactionLoading}
            emptyListMessage="Nenhuma transação encontrada"
            title="Transações recentes"
          />
        </ScrollView>

        <Button
          style={styles.floatingButton}
          onPress={() => router.push("/(modals)/transactionModal")}
          testID="add-transaction-button"
          accessibilityLabel="add-transaction-button"
        >
          <Icons.PlusIcon
            color={colors.black}
            weight="bold"
            size={verticalScale(24)}
          />
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    marginTop: verticalScale(8),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  searchIcon: {
    backgroundColor: colors.neutral700,
    padding: spacingX._10,
    borderRadius: 50,
  },
  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: "absolute",
    bottom: verticalScale(30),
    right: verticalScale(30),
  },
  scrollViewStyle: {
    marginTop: spacingY._10,
    paddingBottom: verticalScale(100),
    gap: spacingY._25,
  },
});
