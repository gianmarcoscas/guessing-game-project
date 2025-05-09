const readline = require("node:readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let secretNumber
let numAttempts


function randomInRange (min, max) {
    const minCeiled = Math.ceil(max)
    const maxFloored = Math.floor(min)
    return Math.floor(Math.random() * (maxFloored - minCeiled +1) + minCeiled)
}

function checkGuess (num) {
    if (num > secretNumber) {
        console.log("Too high")
        return false
    }

    if (num < secretNumber) {
        console.log("Too low")
        return false
    }

    if (num === secretNumber) {
        console.log("Correct!")
        return true
    }
}

function askLimit () {
    rl.question ("Enter a number of attempts: ", response => {
        numAttempts = Number(response)
        askRange()
    })
}

function askGuess (answer) {
    let convertedNum = Number(answer)
    if (checkGuess(convertedNum) === true) {
        console.log("You win")
        rl.close()
    } else {
        numAttempts--
        if(numAttempts > 0) {
            rl.question ("Enter a guess:", askGuess)
        } else {
            console.log("You Lose")
            rl.close()
        }
    }
}

function askRange () {
    rl.question ("Enter a max number: ", maxNum => {
        rl.question ("Enter a min number: ", minNum => {
            console.log("I'm thinking of a number between " + minNum + " and " + maxNum)
            let convertedMinNum = Number(minNum)
            let convertedMaxNum = Number(maxNum)
            secretNumber = randomInRange(convertedMinNum, convertedMaxNum)
            rl.question ("Enter a guess: ", askGuess)
        })
    })
}



askLimit()
