class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        this.initializeGame();
    }

    initializeGame() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameOver = false;
        
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });
        
        document.querySelector('.primary').addEventListener('click', () => this.resetGame());
        this.updateStatus();
    }

    handleCellClick(cell) {
        if (this.gameOver || cell.textContent) return;

        const index = parseInt(cell.dataset.index);
        this.board[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());

        if (this.checkWinner()) {
            this.gameOver = true;
            this.updateStatus(`${this.currentPlayer} wins!`, true);
            this.highlightWinningCells();
        } else if (this.isBoardFull()) {
            this.gameOver = true;
            this.updateStatus('It\'s a tie!', true);
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateStatus();
        }
    }

    checkWinner() {
        return this.winningCombinations.some(combination => {
            return combination.every(index => this.board[index] === this.currentPlayer);
        });
    }

    isBoardFull() {
        return this.board.every(cell => cell !== null);
    }

    highlightWinningCells() {
        const cells = document.querySelectorAll('.cell');
        const winningCombination = this.winningCombinations.find(combination => {
            return combination.every(index => this.board[index] === this.currentPlayer);
        });

        if (winningCombination) {
            winningCombination.forEach(index => {
                cells[index].classList.add('winning-cell');
            });
        }
    }

    updateStatus(message = `Player ${this.currentPlayer}'s turn`, isGameOver = false) {
        const status = document.querySelector('.status');
        status.textContent = message;
        
        if (isGameOver) {
            status.classList.add('game-over');
        } else {
            status.classList.remove('game-over');
        }
    }

    resetGame() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('winning-cell');
        });
        this.initializeGame();
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
