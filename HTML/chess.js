const board = document.getElementById('chessboard');

const pieces = {
    'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛',
    'k': '♚', 'p': '♟', 'R': '♖', 'N': '♘',
    'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
};

let boardState = [
    ['r','n','b','q','k','b','n','r'],
    ['p','p','p','p','p','p','p','p'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['P','P','P','P','P','P','P','P'],
    ['R','N','B','Q','K','B','N','R']
];

let selected = null;
let turn = 'white';

function renderBoard() {
    board.innerHTML = '';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
            square.dataset.row = row;
            square.dataset.col = col;

            const piece = boardState[row][col];
            if (piece) {
                square.textContent = pieces[piece];
                square.classList.add(piece === piece.toUpperCase() ? 'white-piece' : 'black-piece');
            }

            square.addEventListener('click', onSquareClick);
            board.appendChild(square);
        }
    }
}

function onSquareClick(e) {
    const row = parseInt(e.currentTarget.dataset.row);
    const col = parseInt(e.currentTarget.dataset.col);
    const piece = boardState[row][col];

    if (selected) {
        if (isValidMove(selected.row, selected.col, row, col)) {
            boardState[row][col] = boardState[selected.row][selected.col];
            boardState[selected.row][selected.col] = '';
            turn = turn === 'white' ? 'black' : 'white';
        }
        selected = null;
        renderBoard();
    } else {
        if (piece && ((turn === 'white' && piece === piece.toUpperCase()) || (turn === 'black' && piece === piece.toLowerCase()))) {
            selected = {row, col};
            e.currentTarget.classList.add('selected');
        }
    }
}

function isValidMove(fromRow, fromCol, toRow, toCol) {
    const piece = boardState[fromRow][fromCol];
    if (!piece) return false;

    const target = boardState[toRow][toCol];
    if (target && ((piece === piece.toUpperCase() && target === target.toUpperCase()) ||
                   (piece === piece.toLowerCase() && target === target.toLowerCase()))) return false;

    const dr = toRow - fromRow;
    const dc = toCol - fromCol;

    if (piece.toUpperCase() === 'P') {
        const direction = piece === 'P' ? -1 : 1;
        if (dc === 0 && !target && dr === direction) return true;
        if (dc === 0 && !target && ((fromRow === 6 && piece === 'P') || (fromRow === 1 && piece === 'p')) &&
            dr === 2*direction && !boardState[fromRow+direction][fromCol]) return true;
        if (Math.abs(dc) === 1 && dr === direction && target) return true;
        return false;
    }

    if (piece.toUpperCase() === 'N') {
        return (Math.abs(dr) === 2 && Math.abs(dc) === 1) || (Math.abs(dr) === 1 && Math.abs(dc) === 2);
    }

    if (piece.toUpperCase() === 'K') {
        return Math.abs(dr) <= 1 && Math.abs(dc) <= 1;
    }

    if (piece.toUpperCase() === 'R') {
        return (dr === 0 || dc === 0) && isPathClear(fromRow, fromCol, toRow, toCol);
    }

    if (piece.toUpperCase() === 'B') {
        return Math.abs(dr) === Math.abs(dc) && isPathClear(fromRow, fromCol, toRow, toCol);
    }

    if (piece.toUpperCase() === 'Q') {
        return (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) && isPathClear(fromRow, fromCol, toRow, toCol);
    }

    return false;
}

function isPathClear(fromRow, fromCol, toRow, toCol) {
    let dr = Math.sign(toRow - fromRow);
    let dc = Math.sign(toCol - fromCol);
    let r = fromRow + dr;
    let c = fromCol + dc;
    while (r !== toRow || c !== toCol) {
        if (boardState[r][c]) return false;
        r += dr;
        c += dc;
    }
    return true;
}

renderBoard();
