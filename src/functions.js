import inquirer from "inquirer";
import { decode } from "html-entities";

import { fetchQuestions } from "./requests.js";

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

//Constroi o array de respostas, juntando a reposta correta com as respostas incorretas, e o retorna embaralhado
const constructAnswersArray = (question) => {
  let decodedCorrectAnswer = decode(question.correct_answer.trim());
  let decodedIncorrectAnswers = question.incorrect_answers.map((answer) => {
    return decode(answer.trim());
  });
  let allAnswers = [...decodedIncorrectAnswers, decodedCorrectAnswer];
  let shuffledAnswers = shuffleArray(allAnswers);
  return shuffledAnswers;
};

//Retorna um array embaralhadom usando o algoritmo Fisher-Yates
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

//Confere se a resposta fornecida pelo jogador é a correta e atualiza sua pontuação
const checkIfCorrectAnswer = (playerAnswer, correctAnswer) => {
  if (playerAnswer === correctAnswer) return updatePlayerScore();
};

//De acordo com a pontuação final do jogador, seleciona qual mensagem exibir
const chooseResultMessage = () => {
  if (playerScore > 4) {
    return `Congratulations, you got the high score! Your score is: ${playerScore}/5`;
  } else if (playerScore > 0) {
    return `Better luck next time! Your final score is: ${playerScore}/5`;
  } else {
    return `Your final score is: ${playerScore}/5. Who cares, is just a game!`;
  }
};

//Exibe o resultado final no console e dá a opção de jogar novamente
const displayFinalResult = () => {
  inquirer
    .prompt([
      {
        name: "restart",
        type: "list",
        message: `\n\n${chooseResultMessage()}. \nWould you like to play again?`,
        choices: ["Play Again", "Exit"],
      },
    ])
    .then(async (res) => {
      if (res.restart === "Exit") {
        return;
      } else {
        resetPlayerScore();
        displayCategories();
      }
    });
};

//Executa o fluxo de pergunta-resposta do Quiz
const displayQuestion = (questions, index) => {
  if (index < questions.length) {
    inquirer
      .prompt([
        {
          name: "answer",
          type: "list",
          message: "\n" + decode(questions[index].question.toString()),
          choices: constructAnswersArray(questions[index]),
        },
      ])
      .then(async (res) => {
        checkIfCorrectAnswer(res.answer, questions[index].correct_answer);
        index++;
        displayQuestion(questions, index);
      })
      .catch((error) => {
        if (error.isTtyError) {
          console.error(error);
        }
      });
  } else {
    displayFinalResult();
  }
};

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
        questions = await fetchQuestions(11);
        displayQuestion(questions, 0);
      } else if (res.categories === "Video Games") {
        questions = await fetchQuestions(15);
        displayQuestion(questions, 0);
      } else {
        questions = await fetchQuestions(18);
        displayQuestion(questions, 0);
      }
    });
};

//Inicializa o Quiz
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
