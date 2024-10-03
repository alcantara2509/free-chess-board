import { handleSquareColor } from "./handleSquareColor";

export const createBoard = (board) => {
  if (!board) {
    console.error("O elemento 'board' não foi encontrado.");
    return;
  }

  const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const rows = [1, 2, 3, 4, 5, 6, 7, 8];

  rows.reverse().forEach((rowName) => {
    const row = document.createElement("div");
    row.classList.add("row");

    cols.forEach((colName) => {
      const square = document.createElement("span");
      square.classList.add("square");
      square.setAttribute("id", `${colName}${rowName}`);
      square.setAttribute("draggable", false);

      handleSquareColor(square, colName, rowName);

      row.appendChild(square);
    });

    board.appendChild(row);
  });
};
