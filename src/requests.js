import { API } from "./api/index.js";

//Quantidade, dificuldade e tipo das perguntas é estático
const amout = 5;
const difficulty = "easy";
const type = "multiple";

export const fetchQuestions = async (category) => {
  try {
    const response = await API.get(
      `api.php?amount=${amout}&category=${category}&difficulty=${difficulty}&type=${type}`
    );
    const {
      data: { results },
    } = response;
    return results;
  } catch (error) {
    return console.error(error);
  }
};
