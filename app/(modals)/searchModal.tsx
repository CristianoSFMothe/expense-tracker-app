import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import TransactionList from "@/components/TransactionList";
import { expenseCategories, transactionTypes } from "@/constants/data";
import { colors, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import useFechData from "@/hooks/useFechData";
import { TransactionType } from "@/types";
import { orderBy, where } from "firebase/firestore";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const SearchModal = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  const constraints = [where("uid", "==", user?.uid), orderBy("date", "desc")];

  const { data: allTransactions, loading: transactionLoading } =
    useFechData<TransactionType>("transactions", constraints);

  const normalizeText = (text: string = "") =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filteredTransactions = allTransactions.filter((item) => {
    if (search.length < 2) {
      return true;
    }

    const searchTerm = normalizeText(search);

    const categoryLabel =
      item.type === "expense" &&
      item.category &&
      expenseCategories[item.category]
        ? normalizeText(expenseCategories[item.category].label)
        : "";

    const transactionTypeLabel =
      transactionTypes.find((t) => t.value === item.type)?.label || "";

    return (
      categoryLabel.includes(searchTerm) ||
      normalizeText(item.type).includes(searchTerm) ||
      normalizeText(transactionTypeLabel).includes(searchTerm) ||
      normalizeText(item.description).includes(searchTerm)
    );
  });

  return (
    <ModalWrapper style={{ backgroundColor: colors.neutral900 }}>
      <View style={styles.container}>
        <Header
          title={"Pesquisar"}
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        {/* Form */}
        <ScrollView contentContainerStyle={styles.form}>
          <View
            style={styles.inputContainer}
            accessible={true}
            accessibilityLabel="Campo de pesquisa de transação"
            testID="input-search-container"
          >
            <Input
              placeholder="pesquisar..."
              value={search}
              onChangeText={(value) => setSearch(value)}
              accessibilityLabel="Pesquisar transação"
              testID="input-search"
              containerStyle={{ backgroundColor: colors.neutral800 }}
              placeholderTextColor={colors.neutral400}
            />
          </View>
          <View>
            <TransactionList
              loading={transactionLoading}
              data={filteredTransactions}
              emptyListMessage="Nenhuma transação encontrada"
            />
          </View>
        </ScrollView>
      </View>
    </ModalWrapper>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
  },

  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
