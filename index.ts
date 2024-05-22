#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.cyanBright.italic.underline(`\n\t COUNTDOWN TIMER \t\n`));

async function main() {
    let countdown = await inquirer.prompt([
        {
            name: "timer",
            type: "list",
            message: "Select Countdown Timer:",
            choices: ["Seconds", "Minutes"]
        }
    ]);

    if (countdown.timer === "Seconds") {
        const userInput = await inquirer.prompt([
            {
                name: "input1",
                type: "input",
                message: "Enter the number of Seconds:",
                validate: (input) => {
                    if (isNaN(input)) {
                        return "Please enter a valid number!";
                    } else if (input > 60) {
                        return "Please enter seconds under 60";
                    } else {
                        return true;
                    }
                }
            }
        ]);

        let input = parseInt(userInput.input1);
        startTimer(input, "seconds");
    }

    if (countdown.timer === "Minutes") {
        const userInput = await inquirer.prompt([
            {
                name: "input2",
                type: "input",
                message: "Enter the number of Minutes:",
                validate: (input) => {
                    if (isNaN(input)) {
                        return "Please enter a valid number!";
                    } else if (input <= 0) {
                        return "Please enter minutes greater than 0";
                    } else {
                        return true;
                    }
                }
            }
        ]);

        let input = parseInt(userInput.input2);
        startTimer(input, "minutes");
    }
}

function startTimer(value: number, unit: "seconds" | "minutes") {
    let endTime: Date;
    if (unit === "seconds") {
        endTime = new Date(new Date().getTime() + value * 1000);
    } else {
        endTime = new Date(new Date().getTime() + value * 60000);
    }

    const timer = setInterval(() => {
        const currTime = new Date().getTime();
        const timeDifference = endTime.getTime() - currTime;

        if (timeDifference <= 0) {
            console.log(chalk.yellow.bold.italic(`\nAlert..!! Countdown Finished..\n`));
            clearInterval(timer);
            process.exit();
        }

        const totalSeconds = Math.floor(timeDifference / 1000);
        const min = Math.floor(totalSeconds / 60);
        const sec = totalSeconds % 60;

        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000);
}

main();
