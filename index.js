import { getWinner } from "./gameLogic.js";

const startDiv = document.querySelector(".btn");
const startButton = document.getElementById("button");
const mainApp = document.querySelectorAll(".nodisplay")
const body = document.body;
const blocks = document.querySelectorAll(".block");
const replayButton = document.querySelector(".replay");


let game = [[-1 , -1 , -1] , [-1 , -1 , -1] , [-1 , -1 , -1]]
let countX = 0;
let countO = 0;

function update() {
    const xResult = document.getElementById("xResult");
    const oResult = document.getElementById("oResult");

    xResult.innerText = `X : ${countX}`;
    oResult.innerText = `O : ${countO}`;

    if (countX > countO) {
        xResult.style.color = "rgb(230, 68, 68)";
        oResult.style.color = "rgb(230, 68, 68)";
    } else {
        if (countO > countX) {
            xResult.style.color = "rgb(230, 68, 68)";
            oResult.style.color = "rgb(8, 209, 8)";
        } else {
            xResult.style.color = "white";
            oResult.style.color = "white";
        }
    }
}

function initializeAll() {
    replay();
    countO = 0;
    countX = 0;
    update();
}

function initialize() {
    setTimeout(replay , 100);
}

function replay() {
    for (let i = 0; i <= 2 ;i++) {
        for (let j = 0; j <= 2 ;j++) {
            game[i][j] = -1;
       }
    }

    blocks.forEach((block) => {
        if (block.firstChild != null) {
            block.firstChild.innerText = "";
        }
    })

}

function throwError() {
    const errorPar = document.querySelector(".error");
    errorPar.innerText = "place is not empty!";
}

function getCoordinates(number) {
    if (number % 3 == 0) {
        return [(number / 3) - 1 , 2];
    } else {
        return [Math.trunc(number / 3) , (number % 3) - 1]
    }
}

function displayAll() {
    mainApp.forEach((element) => {
        element.style.display = "grid";
    });
}

function makeAnimation() {
    const animate = setInterval(frame , 1);
    const appDiv = document.querySelector(".app");
    var counter = 0;
    let frames = 100;
    
    function frame() {
        if (counter == frames) {
            clearInterval(animate);
            return;
        }
        else {
            counter++;
            appDiv.style.width = (400 / frames) * counter + "px"; 
            appDiv.style.height = (400 / frames) * counter + "px"; 
        }
    }
}


startButton.addEventListener("click" , () => {
    displayAll();
    makeAnimation();
    body.removeChild(startDiv);
})

let round = 0;

blocks.forEach((block) => {
    block.addEventListener("click" , () => {        
        
        const element = block.firstChild;
        
        let number = block.classList[1];
        let co = getCoordinates(number);
        
        if (game[co[0]][co[1]] == -1) {
            if (round % 2 == 0) {
                element.innerText = "O";
            } else {
                element.innerText = "X";
            }
            document.querySelector(".error").innerText = "";
            game[co[0]][co[1]] = round % 2;
        } else {
            round--;
            throwError();
        }
        
        let winner = getWinner();
        
        if (winner != -1) {
            if (winner == 0) {
                alert("Player O has won the game");
                countO++;
            } else {
                alert("Player X has won the game");
                countX++;
            }
            
            initialize()
            round = -1;
            update();
        }
        
        if (round == 8) {
            initialize();
            round = -1;
        }
        
        round++;
    })
})

replayButton.addEventListener("click" , initializeAll);

export { game }