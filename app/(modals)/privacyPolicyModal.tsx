import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import { colors, spacingY } from "@/constants/theme";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const PrivacyPolicyModal = () => {
  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title="Política de Privacidade"
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <Typo size={16} fontWeight="600" style={styles.title}>
            1. Coleta de Dados
          </Typo>
          <Typo style={styles.paragraph}>
            Nosso aplicativo coleta informações que você nos fornece
            diretamente, como nome, e-mail e dados de transações financeiras
            (despesas, rendas, detalhes de carteiras). Essas informações são
            essenciais para o funcionamento dos recursos de controle financeiro.
          </Typo>

          <Typo size={16} fontWeight="600" style={styles.title}>
            2. Uso das Informações
          </Typo>
          <Typo style={styles.paragraph}>Utilizamos seus dados para:</Typo>
          <Typo style={styles.listItem}>
            - Fornecer, operar e manter nossos serviços.
          </Typo>
          <Typo style={styles.listItem}>
            - Personalizar sua experiência e exibir estatísticas sobre seus
            hábitos financeiros.
          </Typo>
          <Typo style={styles.listItem}>
            - Comunicar com você, incluindo para fins de suporte ao cliente.
          </Typo>

          <Typo size={16} fontWeight="600" style={styles.title}>
            3. Armazenamento e Segurança
          </Typo>
          <Typo style={styles.paragraph}>
            Seus dados são armazenados de forma segura em servidores do Firebase
            (Google). Empregamos medidas de segurança para proteger suas
            informações contra acesso, alteração ou destruição não autorizada.
          </Typo>

          <Typo size={16} fontWeight="600" style={styles.title}>
            4. Compartilhamento de Dados
          </Typo>
          <Typo style={styles.paragraph}>
            Nós não compartilhamos suas informações pessoais com terceiros para
            fins de marketing. Seus dados são usados exclusivamente para a
            funcionalidade do aplicativo.
          </Typo>

          <Typo size={16} fontWeight="600" style={styles.title}>
            5. Seus Direitos
          </Typo>
          <Typo style={styles.paragraph}>
            Você tem o direito de acessar, corrigir ou excluir suas informações
            pessoais a qualquer momento através das funcionalidades do
            aplicativo.
          </Typo>
        </ScrollView>
      </View>
    </ModalWrapper>
  );
};

export default PrivacyPolicyModal;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: spacingY._20 },
  content: { gap: spacingY._10, paddingBottom: spacingY._40 },
  title: { color: colors.white, marginTop: spacingY._10 },
  paragraph: { color: colors.neutral300, lineHeight: 22 },
  listItem: { color: colors.neutral300, marginLeft: spacingY._10 },
});
