import { createBoard } from "./createBoard";
import "lodash";

const board = document.querySelector(".board");

createBoard(board);

const squares = document.querySelectorAll(".square");

const a1 = board.querySelector("#a1");
const a2 = board.querySelector("#a2");

const WRook = document.createElement("div");
WRook.setAttribute("class", "pieces");
WRook.setAttribute("draggable", true);

const WBishop = document.createElement("div");
WBishop.setAttribute("class", "pieces");
WBishop.setAttribute("draggable", true);
WBishop.style.backgroundColor = "black";

a1.append(WRook);
a2.append(WBishop);

document.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("pieces")) {
    e.dataTransfer.setData("text/plain", "");
    const dragImage = document.createElement("div");
    dragImage.style.width = "0";
    dragImage.style.height = "0";
    document.body.appendChild(dragImage);

    e.dataTransfer.setDragImage(dragImage, 0, 0);
    e.target.classList.add("dragging");
  }
});

document.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
});

squares.forEach((item) => {
  item.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");

    if (dragging && item.classList.contains("square")) {
      const applyAfter = getNewPosition(item, e.clientY);

      if (applyAfter) {
        applyAfter.parentNode.removeChild(applyAfter);
      }

      item.prepend(dragging);
    }
  });

  item.addEventListener("drop", (e) => {
    e.preventDefault();

    const dragging = document.querySelector(".dragging");

    if (dragging && item.classList.contains("square")) {
      const applyAfter = getNewPosition(item, e.clientY);

      if (applyAfter) {
        applyAfter.parentNode.removeChild(applyAfter);
        item.insertBefore(dragging, applyAfter);
      } else {
        item.appendChild(dragging);
      }
    }
  });
});

const getNewPosition = (column, posY) => {
  const squares = column.querySelectorAll(".pieces:not(.dragging)");
  let result = null;

  for (let refer_square of squares) {
    const box = refer_square.getBoundingClientRect();
    const boxCenterY = box.top + box.height / 2;

    if (posY >= boxCenterY) {
      result = refer_square;
    } else {
      break;
    }
  }

  return result;
};
