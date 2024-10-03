export const handleSquareColor = (square, col, row) => {
  const isEvenRow = row % 2 === 0;
  const isEvenCol = ["b", "d", "f", "h"].includes(col);

  const color =
    (isEvenCol && isEvenRow) || (!isEvenCol && !isEvenRow) ? "white" : "black";

  square.classList.add(color);
};
