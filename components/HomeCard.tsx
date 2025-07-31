import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import useFechData from "@/hooks/useFechData";
import { WalletType } from "@/types";
import { formatCurrency } from "@/utils/formatters";
import { scale, verticalScale } from "@/utils/styling";
import { orderBy, where } from "firebase/firestore";
import * as Icons from "phosphor-react-native";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Typo from "./Typo";

const HomeCard = () => {
  const { user } = useAuth();

  const {
    data: wallets,
    error,
    loading: walletLoading,
  } = useFechData<WalletType>("wallets", [
    where("uid", "==", user?.uid),
    orderBy("created", "desc"),
  ]);

  const getTotals = () => {
    return wallets.reduce(
      (totals: any, item: WalletType) => {
        totals.balance = totals.balance + Number(item.amount);
        totals.income = totals.income + Number(item.totalIncome);
        totals.expenses = totals.expenses + Number(item.totalExpenses);
        return totals;
      },
      { balance: 0, income: 0, expenses: 0 },
    );
  };

  return (
    <ImageBackground
      source={require("../assets/images/card.png")}
      resizeMode="stretch"
      style={styles.bgImage}
      accessibilityLabel="card"
    >
      <View style={styles.container}>
        <View accessible accessibilityLabel="total-balance-section">
          {/* Total Balance */}
          <View style={styles.totalBalanceRow}>
            <Typo
              color={colors.neutral800}
              size={17}
              fontWeight={"500"}
              accessibilityLabel="total-balance-label"
              testID="total-balance-label"
            >
              Saldo total
            </Typo>
            <Icons.DotsThreeOutlineIcon
              size={verticalScale(23)}
              color={colors.black}
              weight="fill"
              testID="options-icon"
            />
          </View>
          <Typo
            color={colors.black}
            size={30}
            fontWeight={"bold"}
            accessibilityLabel="total-balance-value"
            testID="total-balance-value"
          >
            {walletLoading
              ? "----"
              : formatCurrency(getTotals().balance?.toFixed(2))}
          </Typo>
        </View>

        {/* Total Expense and Income */}
        <View
          style={styles.stats}
          accessible
          accessibilityLabel="income-expense-section"
        >
          {/* Income */}
          <View style={{ gap: verticalScale(5) }}>
            <View style={styles.incomeExpense}>
              <View style={styles.statsIcon}>
                <Icons.ArrowDownIcon
                  size={verticalScale(15)}
                  color={colors.black}
                  weight="bold"
                  testID="income-icon"
                />
              </View>
              <Typo
                size={16}
                color={colors.neutral700}
                fontWeight={"500"}
                accessibilityLabel="income-label"
                testID="income-label"
              >
                Renda
              </Typo>
            </View>

            <View style={{ alignSelf: "center" }}>
              <Typo
                size={17}
                color={colors.green}
                fontWeight={"600"}
                accessibilityLabel="income-value"
                testID="income-value"
              >
                {walletLoading
                  ? "----"
                  : formatCurrency(getTotals().income?.toFixed(2))}
              </Typo>
            </View>
          </View>

          {/* expense */}
          <View style={{ gap: verticalScale(5) }}>
            <View style={styles.incomeExpense}>
              <View style={styles.statsIcon}>
                <Icons.ArrowUpIcon
                  size={verticalScale(15)}
                  color={colors.black}
                  weight="bold"
                  testID="expense-icon"
                />
              </View>
              <Typo
                size={16}
                color={colors.neutral700}
                fontWeight={"500"}
                accessibilityLabel="expense-label"
                testID="expense-label"
              >
                Despesa
              </Typo>
            </View>

            <View style={{ alignSelf: "center" }}>
              <Typo
                size={17}
                color={colors.rose}
                fontWeight={"600"}
                accessibilityLabel="expense-value"
                testID="expense-value"
              >
                {walletLoading
                  ? "----"
                  : formatCurrency(getTotals().expenses?.toFixed(2))}
              </Typo>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  bgImage: {
    height: scale(210),
    width: "100%",
  },
  container: {
    padding: spacingX._20,
    paddingHorizontal: scale(23),
    height: "87%",
    width: "100%",
    justifyContent: "space-between",
  },
  totalBalanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._5,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsIcon: {
    backgroundColor: colors.neutral350,
    padding: spacingY._5,
    borderRadius: 50,
  },
  incomeExpense: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacingY._7,
  },
});
