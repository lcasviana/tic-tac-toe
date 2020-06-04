(() => {
  const players = { null: '❓', false: '❌', true: '⭕' };
  let board;
  let isFinished;
  let currentPlayer;

  initGrid();

  function initGrid() {
    document.querySelector('#new').addEventListener('click', () => resetGrid());
    let gameGrid = document.querySelector('#grid');
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const gridElement = document.createElement('div');
        gridElement.className = 'element';
        gridElement.addEventListener('click', (event) => handleClick(event.toElement, row, col));
        gameGrid.append(gridElement);
      }
    }
    resetGrid();
  }

  function resetGrid() {
    board = Array(3).fill().map(() => Array(3).fill());
    isFinished = undefined;
    currentPlayer = true;
    document.querySelectorAll('.element').forEach((gridElement) => {
      gridElement.className = 'element unmarked';
      gridElement.innerHTML = '';
    });
  }

  function handleClick(element, row, col) {
    if (isFinished || board[row][col]) return;
    setPlayerMark(element, row, col)
    verifyEndGame();
  }

  function setPlayerMark(element, row, col) {
    element.classList.toggle('unmarked');
    element.classList.toggle('marked');
    element.innerHTML = players[currentPlayer];
    board[row][col] = players[currentPlayer];
    currentPlayer = !currentPlayer;
  }

  function verifyEndGame() {
    checkLine(board[0][0], board[1][1], board[2][2]);
    checkLine(board[0][2], board[1][1], board[2][0]);
    for (let i = 0; i < 3; i++) {
      checkLine(board[i][0], board[i][1], board[i][2]);
      checkLine(board[0][i], board[1][i], board[2][i]);
    }
    checkDraw();
    if (!isFinished) return;
    setTimeout(() => showMessage(), 50);
  }

  function checkLine(i, j, k) {
    if (isFinished) return;
    if (!i || !j || !k) return;
    if (i === j && j === k) isFinished = i;
  }

  function checkDraw() {
    for (let row = 0; row < 3; row++)
      for (let col = 0; col < 3; col++)
        if (!board[row][col]) return;
    if (!isFinished) isFinished = players[null];
  }

  function showMessage() {
    switch (isFinished) {
      case players[false]:
        alert(`O xis venceu o jogo! 👏👏👏`);
        break;
      case players[true]:
        alert(`O bolinha venceu o jogo! 👏👏👏`);
        break;
      case players[null]:
        alert(`Temos um empate! 😱`);
        break;
      default:
        alert(`Erro inesperado... 😣`);
    }
  }
})()