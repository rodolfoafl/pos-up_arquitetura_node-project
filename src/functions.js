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

export const startQuiz = () => {
  console.log("Starting quiz...");
};
