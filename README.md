# 💸 Expense Tracker App

<div align="center"> 
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://reactnative.dev/">
    <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  </a>
  <a href="https://expo.dev/">
    <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  </a>
  <a href="https://firebase.google.com/">
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  </a>
</div>

<br />
<br />

Aplicativo mobile para **simular, controlar e gerenciar despesas pessoais**, com banco de dados em tempo real.

Desenvolvido com foco em praticidade e organização financeira, o app permite que o usuário registre suas transações, visualize seu saldo e acompanhe suas movimentações diretamente no celular.

![splash](./assets/images/splashImage.png)

---

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

- [**React Native**](https://reactnative.dev/) — desenvolvimento mobile nativo com JavaScript
- [**Expo**](https://expo.dev/) — framework e plataforma para apps React Native
- [**TypeScript**](https://www.typescriptlang.org/) — tipagem estática para maior segurança
- [**Zod**](https://github.com/colinhacks/zod) — validação de schemas para formulários
- [**Firebase (Firestore & Auth)**](https://firebase.google.com/) — banco de dados NoSQL, autenticação e armazenamento
- [**Cloudinary**](https://cloudinary.com/) — armazenamento e otimização de imagens
- [**React Hook Form**](https://react-hook-form.com/) — controle de formulários

---

## 🧩 Funcionalidades

- ✅ Cadastro e login de usuários (Firebase Auth)
- 📝 Registro de transações de **entrada** e **saída**
- ✏️ Edição e exclusão de despesas
- 📊 Listagem de movimentações financeiras
- 💰 Visualização de saldo atualizado
- ☁️ Dados sincronizados em **tempo real** com o Firebase Firestore
- 🖼️ Upload de imagens de perfil e comprovantes (Cloudinary)
- 🔒 Validação de formulários com Zod + React Hook Form

---

## 📦 Instalação e Configuração

Siga os passos abaixo para executar o projeto em seu ambiente local.

1. Clone o repositório:

   ```bash
   git clone https://github.com/CristianoSFMothe/expense-tracker-app.git
   ```

2. Instale as dependências:

   ```bash
   cd expense-tracker-app
   npm install
   ```

3. **Configure as Variáveis de Ambiente**

   Crie um arquivo `.env` na raiz do projeto e adicione as chaves do seu projeto Firebase e da sua conta Cloudinary.

   > **Importante:** Para que o Expo possa acessar as variáveis, elas **precisam** ser prefixadas com `EXPO_PUBLIC_`.

   ```env
   # Firebase
   EXPO_PUBLIC_FIREBASE_API_KEY=...
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   EXPO_PUBLIC_FIREBASE_APP_ID=...

   # Cloudinary
   EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=...
   EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET=...
   ```

4. Execute o projeto:

```bash
npm run android
# ou
npm run start
# ou
npm run ios
```

> O projeto está configurado para funcionar com o Firebase em tempo real e Expo para desenvolvimento em Android e iOS.

---

## 📱 Screenshots

> (Adicione aqui imagens das telas do app se quiser)

---

## 🛠️ Estrutura de pastas

```
├── app/             # Rotas com expo-router
├── assets/          # Imagens e ícones
├── components/      # Componentes reutilizáveis (UI, modais, botões, etc.)
├── config/          # Configurações do Firebase, temas, etc.
├── constants/       # Cores, espaçamentos, bordas e fontes
├── contexts/        # Contextos globais (ex: autenticação, transações)
├── hooks/           # Hooks personalizados (useAuth, useTransactions, etc.)
├── schemas/         # Schemas de validação com Zod
├── scripts/         # Scripts auxiliares (ex: reset de dados)
├── services/        # Lógica de integração com Firebase (CRUD)
├── utils/           # Funções utilitárias e helpers
├── .env             # Variáveis de ambiente (não commitado)
├── env.d.ts         # Tipagens do dotenv
├── app.config.js    # Configuração do Expo com variáveis de ambiente
```

---

## 📋 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

## 👨‍💻 Autor

Desenvolvido por **Cristiano Ferreira Mothe**

- GitHub: [CristianoSFMothe](https://github.com/CristianoSFMothe)
- LinkedIn: [linkedin.com/in/cristiano-da-silva-ferreira](https://www.linkedin.com/in/cristiano-da-silva-ferreira/)
