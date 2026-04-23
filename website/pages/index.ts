import { send } from "clientUtilities";

let attempts = 0;

var guessInput = document.querySelector<HTMLInputElement>("#itemInput")!;
var guessButton = document.querySelector<HTMLButtonElement>("#addButton")!;
var resultList = document.querySelector<HTMLUListElement>("#itemsUl")!;


await send("startGame");

guessButton.onclick = async function () {
  let guess = parseInt(guessInput.value);

  let result = await send<string>("guess", guess);

  attempts++;

  var li = document.createElement("li");
  li.innerText = result;
  resultList.appendChild(li);

  if (result === "correct") {
    await send("saveScore", attempts);
    alert("You won! Attempts: " + attempts);
  }
};