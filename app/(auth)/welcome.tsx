import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { Animated, Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Welcome() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Login button & image */}
        <View>
          <TouchableOpacity style={styles.loginButton}>
            <Typo>Entrar</Typo>
          </TouchableOpacity>

          <Image
            source={require("../../assets/images/welcome.png")}
            style={styles.welcomeImage}
            resizeMode="contain"
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={{ alignItems: "center" }}>
            <Typo size={25} fontWeight={"800"}>
              Sempre assuma o controle
            </Typo>
            <Typo size={25} fontWeight={"800"}>
              de suas finanças
            </Typo>
          </View>

          <View style={{ alignItems: "center", gap: 2 }}>
            <Typo size={15} color={colors.textLight}>
              As finanças devem ser organizadas para estabelecer um melhor
            </Typo>
            <Typo size={15} color={colors.textLight}>
              estilo de vida no futuro
            </Typo>
          </View>

          <View style={styles.buttonContainer}>
            <Button>
              <Typo size={20} color={colors.neutral900} fontWeight={"600"}>
                Comece Agora
              </Typo>
            </Button>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: spacingY._7,
  },
  welcomeImage: {
    width: "100%",
    height: verticalScale(300),
    alignSelf: "center",
    marginTop: verticalScale(100),
  },
  loginButton: {
    alignSelf: "flex-end",
    marginRight: spacingX._20,
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingX._20,
    shadowColor: "white",
    shadowOffset: { width: 0, height: -10 },
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});
