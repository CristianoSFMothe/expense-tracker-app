import { expenseCategories, incomeCategory } from "@/constants/data";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import {
  TransactionItemProps,
  TransactionListType,
  TransactionType,
} from "@/types";
import { formatCurrency } from "@/utils/formatters";
import { verticalScale } from "@/utils/styling";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./Loading";
import Typo from "./Typo";

const TransactionList = ({
  data,
  title,
  loading,
  emptyListMessage,
}: TransactionListType) => {
  const router = useRouter();
  const handleClick = (item: TransactionType) => {
    router.push({
      pathname: "/(modals)/transactionModal",
      params: {
        id: item?.id,
        type: item?.type,
        amount: item?.amount?.toString(),
        category: item?.category,
        date: (item.date as Timestamp)?.toDate()?.toISOString(),
        description: item?.description,
        image: item?.image,
        uid: item?.uid,
        walletId: item?.walletId,
      },
    });
  };

  return (
    <View style={styles.container}>
      {title && (
        <Typo size={20} fontWeight={"500"} testID="transaction-list-title">
          {title}
        </Typo>
      )}

      <View style={styles.list}>
        <FlashList
          data={data}
          renderItem={({ item, index }) => (
            <TransactionItem
              item={item}
              index={index}
              handleClick={handleClick}
            />
          )}
          estimatedItemSize={60}
          testID="transaction-list"
        />
      </View>

      {!loading && data.length === 0 && (
        <Typo
          size={15}
          color={colors.neutral400}
          style={{ textAlign: "center", marginTop: spacingY._15 }}
          testID="transaction-list-empty-message"
          accessibilityLabel={emptyListMessage}
        >
          {emptyListMessage}
        </Typo>
      )}

      {loading && (
        <View
          style={{ top: verticalScale(100), marginTop: spacingY._15 }}
          testID="transaction-list-loading"
        >
          <Loading />
        </View>
      )}
    </View>
  );
};

const TransactionItem = ({
  item,
  index,
  handleClick,
}: TransactionItemProps) => {
  let category =
    item?.type === "income"
      ? incomeCategory
      : expenseCategories[item.category!];

  const IconComponent = category.icon;

  const date = (item?.date as Timestamp)
    ?.toDate()
    ?.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
    });

  const formattedAmount = formatCurrency(item?.amount);
  const sign = item?.type === "income" ? "+" : "-";
  const accessibilityAmount = `${
    item?.type === "income" ? "Entrada de" : "Saída de"
  } ${formattedAmount}`;
  const accessibilityDescription = item?.description
    ? `, descrição ${item.description}`
    : "";
  const fullAccessibilityLabel = `Transação de ${category.label}, ${accessibilityAmount}${accessibilityDescription}. Toque para ver detalhes.`;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 70)
        .springify()
        .damping(14)}
    >
      <TouchableOpacity
        style={styles.row}
        onPress={() => handleClick(item)}
        testID={`transaction-item-${item.id || index}`}
        accessibilityRole="button"
        accessibilityLabel={fullAccessibilityLabel}
      >
        <View style={[styles.icon, { backgroundColor: category.bgColor }]}>
          {IconComponent && (
            <IconComponent
              size={verticalScale(25)}
              weight="fill"
              color={colors.white}
            />
          )}
        </View>

        <View style={styles.categoryDes}>
          <Typo
            size={17}
            testID={`item-category-${category?.value}-${index}`}
            accessibilityLabel={`item-category-${category?.value}`}
          >
            {category.label}
          </Typo>
          <Typo
            size={12}
            color={colors.neutral400}
            numberOfLines={1}
            testID={`item-description-${category?.description}-${index}`}
            accessibilityLabel={`item-category-${category?.description}-${index}`}
          >
            {item?.description}
          </Typo>
        </View>

        <View style={styles.amountDate}>
          <Typo
            color={item?.type === "income" ? colors.primary : colors.rose}
            fontWeight={"500"}
          >
            {`${sign} ${formattedAmount}`}
          </Typo>

          <Typo
            size={13}
            color={colors.neutral400}
            testID={`transaction-item-date-${date}-${index}`}
            accessibilityLabel={`item-date-${date}-${index}`}
          >
            {date}
          </Typo>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  container: {
    gap: spacingY._17,
    // flex: 1,
    // backgroundColor: "red"
  },
  list: {
    minHeight: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacingX._12,
    marginBottom: spacingY._12,

    // List wih background
    backgroundColor: colors.neutral800,
    padding: spacingY._10,
    paddingHorizontal: spacingY._10,
    borderRadius: radius._17,
  },
  icon: {
    height: verticalScale(44),
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius._12,
    borderCurve: "continuous",
  },
  categoryDes: {
    flex: 1,
    gap: 2.5,
  },
  amountDate: {
    alignItems: "flex-end",
    gap: 3,
  },
});
