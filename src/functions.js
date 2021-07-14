import inquirer from "inquirer";

//#region Variáveis e Métodos para manipulação da pontuação
//Pontuação do jogador
let playerScore = 0;

//Reseta a pontuação do jogador
const resetPlayerScore = () => {
  playerScore = 0;
};

//Atualiza a pontuação do jogador
const updatePlayerScore = () => {
  playerScore++;
};
//#endregion

//Categorias pré-definidas
const predefinedCategories = [
  { id: 11, name: "Movies" },
  { id: 15, name: "Video Games" },
  { id: 18, name: "Computers" },
];

//Exibe as categorias disponíveis
const displayCategories = () => {
  inquirer
    .prompt([
      {
        name: "categories",
        type: "list",
        message: "\n\nIn which category would you like to test your knowledge?",
        choices: predefinedCategories.map((category) => {
          return { ...category }.name;
        }),
      },
    ])
    .then(async (res) => {
      let questions = [];
      if (res.categories === "Movies") {
        console.log("selected movies");
      } else if (res.categories === "Video Games") {
        console.log("selected video games");
      } else {
        console.log("selected computers");
      }
    });
};

export const startQuiz = () => {
  inquirer
    .prompt([
      {
        name: "start",
        type: "list",
        message: "Welcome to the Quiz! Let's start?",
        choices: ["Start Quiz", "Exit"],
      },
    ])
    .then(async (res) => {
      if (res.start === "Exit") {
        return;
      } else {
        displayCategories();
      }
    });
};
