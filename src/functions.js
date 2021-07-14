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

export const startQuiz = () => {
  console.log("Starting quiz...");
};
