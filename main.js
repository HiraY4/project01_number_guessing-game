#!/usr/bin/env node
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import chalk from "chalk";
const sleep = (ms = 2000) => new Promise((resolve, rejects) => setTimeout(resolve, ms));
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(`THE GUESSING GAME BEGINS`);
    await sleep();
    rainbowTitle.stop();
}
// welcome();
let playerlife = 3;
async function askQuestion() {
    let compChoice = Math.floor(Math.random() * 10 + 1);
    do {
        playerlife--;
        console.log(chalk.red(`The player has ${playerlife} attempt(s) left`));
        var Ques = await inquirer.prompt([
            {
                name: "question",
                type: "number",
                message: chalk.white("Guess a number from 1 - 10"),
                validate: (input) => {
                    if (isNaN(input)) {
                        return chalk.red(`please enter a number`);
                    }
                    return true;
                }
            }
        ]);
        // console.log(Ques);
        if (Ques.question === compChoice) {
            console.log(chalk.blue(`You guessed the Right number, You Won!!`));
        }
        else if (Ques.question < compChoice) {
            console.log(chalk.yellow(`guess a higher number`));
        }
        else if (Ques.question > compChoice) {
            console.log(chalk.yellow(`guess a lower number`));
        }
    } while (playerlife > 0 && compChoice !== Ques.question);
    if (playerlife == 0 && compChoice !== Ques.question) {
        console.log(chalk.red(`The Game is Over`));
    }
}
// askQuestion();
async function restartGame() {
    do {
        console.clear();
        await welcome();
        playerlife = 3;
        await askQuestion();
        var re = await inquirer.prompt([
            {
                name: "start",
                type: "input",
                message: "would you like to guess again? Y or N: "
            }
        ]);
    } while (re.start == "y" || re.start == "Y" || re.start == "yes" || re.start == "YES");
}
restartGame();
