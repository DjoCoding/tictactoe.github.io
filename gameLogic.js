import {game} from "./index.js"

export function getWinner() {

    let line = getLine();
    let col = getCol();
    let diag = getDiag();

    // game.forEach(console.log)

    if (line != -1) {
        return getWinnerLine(line);
    }

    if (col != -1) {
        return getWinnerCol(col);
    }

    if (diag != -1) {
        return getWinnerDiag(diag);
    }

    return -1;

}

export function getWinnerLine(line) {
    return game[line][0];
}

export function getWinnerCol(col) {
    return game[0][col];
}

export function getWinnerDiag(diag) {
    if (diag == 1) {
        return game[diag][diag];
    } else {
        return game[0][2];
    }
}

export function checkLine(line) {
    let number = game[line][0];

    if (number == -1) {
        return false
    } else {
        let j = 1;
        while (j <= 2) {
            if (game[line][j] != number || game[line][j] == -1) {
                return false;
            }
            j++;
        }
        return true;
    }
}

export function getLine() {
    for (let i = 0 ; i <= 2 ; i++) {
        if (checkLine(i)) return i;
    }

    return -1;
}

export function checkCol(col) {

    const number = game[0][col];

    if (number == -1) return false;

    for (let j = 1 ; j <= 2 ;j++) {
        if (game[j][col] != number || game[j][col] == -1) {
            return false;
        }
    }

    return true;

}

export function getCol() {

    for (let i = 0; i <=2 ; i++) {
        if (checkCol(i)) return i;
    }

    return -1;
}

export function checkDiag(number) {
    if (number == 1) {
        const element = game[0][0];
        if (element == -1) {
            return false;
        } else {
            for (let i = 1; i <= 2 ; i++) {
                if (game[i][i] != element || game[i][i] == - 1) return false;
            }
        }
    } else {
        const element = game[0][2];
        if (element == -1) {
            return false;
        } else {
            for (let i = 1; i <= 2 ; i++) {
                if (game[i][2 - i] != element || game[i][2-i] == -1) {
                    return false;
                }
            }
        }
    }
    return true;
}


export function getDiag() {
    for (let i = 1 ; i <= 2 ;i++) {
        if (checkDiag(i)) return i;
    }
    return -1;
}


