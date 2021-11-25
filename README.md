# Aplicação Móvel TFG II

Aplicação desenvolvida para o TFG II utilizando React Native, SQLite e Javascript.

## Pré-instalação

Para rodar o projeto, é necessária a instalação do NodeJS.

A instalação do Node no Windows é relativamente simples, basta acessar o site oficial e [fazer download do instalador](https://nodejs.org/en/download/)

No MacOS, basta instalar pelo **brew**
```bash
brew install node
```
No Linux, a instalação pode ser feita da seguinte forma:
```bash
sudo apt install nodejs
```

Além do Node, é necessário instalar o Watchman, necessário para visualizar possíveis mudanças no projeto durante a execução: [link da documentação](https://facebook.github.io/watchman/docs/install.html) 

O projeto pode ser rodado diretamente no smartphone ou através de um dispositivo virtual, para a segunda opção é necessário seguir os seguintes passos: 

**Instalar o Android Studio:** faça a [instalação do Android Studio](https://developer.android.com/studio?hl=pt-br), durante a instalação verifique se os seguintes itens estão marcados:
* Android SDK
* Android SDK Platform
* Android Virtual Device

Parar criar o dispositivo virtual, siga os passos no link: [criar e gerenciar dispositivos virtuais](https://developer.android.com/studio/run/managing-avds?hl=pt-br) 

## Instalação do projeto

Para instalar o projeto, basta rodar o seguinte comando:
```bash
npm install
```

Após a instalação, para iniciar o projeto no modo de desenvolvimento, rode os seguintes comandos dentro da pasta **Sinuelo**, recomenda-se o uso de dois terminais distintos:

No primeiro terminal rode o seguinte comando:
```bash
npx react-native start
```
No segundo terminal, inicie a aplicação com:
```bash
npx react-native run-android
```
## Dúvidas
Em caso de dúvidas, envie um e-mail para [cassio.gamarra@ufn.edu.br](mailto:cassio.gamarra@ufn.edu.br) 