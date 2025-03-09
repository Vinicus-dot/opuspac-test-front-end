# opuspac-test-front-end

## Requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina. O Node.js é necessário para executar o Vite e gerenciar as dependências do projeto.

## Configuração Recomendada do IDE

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (e desative o Vetur).

## Suporte a Tipos para Importações `.vue` em TS

O TypeScript não consegue lidar com informações de tipo para importações `.vue` por padrão, então substituímos o CLI `tsc` pelo `vue-tsc` para verificação de tipos. Nos editores, precisamos do [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) para tornar o serviço de linguagem TypeScript ciente dos tipos `.vue`.

## Personalizar Configuração

Veja a [Referência de Configuração do Vite](https://vite.dev/config/).

## Configuração do Projeto

Para rodar o projeto, siga os passos abaixo:

1. Navegue até o diretório do projeto no terminal.
2. Instale as dependências do projeto com o seguinte comando:
   ```
   npm install
   ```
3. Após a instalação das dependências, inicie o servidor de desenvolvimento com o comando:
   ```
   npm run dev
   ```
4. Abra seu navegador e acesse `http://localhost:5173` para ver o aplicativo em execução.

Certifique-se de que o Node.js esteja instalado e configurado corretamente em sua máquina antes de executar esses comandos.
