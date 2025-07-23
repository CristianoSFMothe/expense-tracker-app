import { CategoryType, ExpenseCategoriesType } from "@/types";

import * as Icons from "phosphor-react-native";

export const expenseCategories: ExpenseCategoriesType = {
  groceries: {
    label: "Mantimentos",
    value: "groceries",
    icon: Icons.ShoppingCartIcon,
    bgColor: "#4B5563", // Deep Teal Green
  },
  rent: {
    label: "Aluguel",
    value: "rent",
    icon: Icons.HouseIcon,
    bgColor: "#075985", // Dark Blue
  },
  utilities: {
    label: "Utilitários",
    value: "utilities",
    icon: Icons.LightbulbIcon,
    bgColor: "#ca8a04", // Dark Golden Brown
  },
  transportation: {
    label: "Transporte",
    value: "transportation",
    icon: Icons.Car,
    bgColor: "#b45309", // Dark Orange-Red
  },
  entertainment: {
    label: "Entretenimento",
    value: "entertainment",
    icon: Icons.FilmStripIcon,
    bgColor: "#0f766e", // Darker Red-Brown
  },
  dining: {
    label: "Jantar",
    value: "dining",
    icon: Icons.ForkKnifeIcon,
    bgColor: "#be185d", // Dark Red
  },
  health: {
    label: "Saúde",
    value: "health",
    icon: Icons.HeartBreakIcon,
    bgColor: "#e11d48", // Dark Purple
  },
  insurance: {
    label: "Seguro",
    value: "insurance",
    icon: Icons.ShieldCheckIcon,
    bgColor: "#404040", // Dark Gray
  },
  savings: {
    label: "Poupança",
    value: "savings",
    icon: Icons.PiggyBankIcon,
    bgColor: "#065F46", // Deep Teal Green
  },
  clothing: {
    label: "Roupas",
    value: "clothing",
    icon: Icons.TShirtIcon,
    bgColor: "#7c3aed", // Dark Indigo
  },
  personal: {
    label: "Pessoal",
    value: "personal",
    icon: Icons.UserIcon,
    bgColor: "#a21caf", // Deep Pink
  },
  others: {
    label: "Outros",
    value: "others",
    icon: Icons.DotsThreeOutlineIcon,
    bgColor: "#525252", // Neutral Dark Gray
  },
};

export const incomeCategory: CategoryType = {
  label: "Renda",
  value: "income",
  icon: Icons.CurrencyDollarSimpleIcon,
  bgColor: "#16a34a", // Dark
};

export const transactionTypes = [
  { label: "Despesa", value: "expense" },
  { label: "Renda", value: "income" },
];
