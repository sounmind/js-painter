const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const brushSize = document.getElementById("jsBrushSize");
const modeButton = document.getElementById("jsModeButton");
const saveButton = document.getElementById("jsSaveButton");
const clearButton = document.getElementById("jsClearButton");
const restoreButton = document.getElementById("jsRestoreButton");

const DEFAULT_LINE_WIDTH = 5;
const DEFAULT_COLOR = "black";
const CANVAS_DEFAULT_WIDTH = 700;
const CANVAS_DEFAULT_HEIGHT = 700;
const DEFAULT_BACKGROUND_COLOR = "white";

let painting = false;
let filling = false;
let canvasHistory = [];

canvas.width = CANVAS_DEFAULT_WIDTH;
canvas.height = CANVAS_DEFAULT_HEIGHT;

// 배경 설정
context.fillStyle = DEFAULT_BACKGROUND_COLOR;
context.fillRect(0, 0, canvas.width, canvas.height);

// 브러시 색깔, 크기 초기화
context.strokeStyle = DEFAULT_COLOR;
context.lineWidth = DEFAULT_LINE_WIDTH;

function startPainting() {
  //   console.log("save(mouse down)");
  updateHistory();
  painting = true;
}

function stopPainting(event) {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // 클릭하지 않고 화면 위에서 마우스를 움직이면 실행
    context.beginPath();
    context.moveTo(x, y);
  } else {
    // 클릭하고, 마우스를 움직일 때마다 실행
    if (!filling) {
      context.lineTo(x, y);
      context.stroke();
    }
  }
}

function handleColorClick(event) {
  const colorClicked = event.target.style.backgroundColor;
  context.strokeStyle = colorClicked;
  context.fillStyle = colorClicked;
}

function handleBrushSizeChange(event) {
  const brushSizeChanged = event.target.value;
  context.lineWidth = brushSizeChanged;
}

function handleModeChange(event) {
  if (filling) {
    filling = false;
    modeButton.innerText = "Mode: Fill";
  } else {
    filling = true;
    modeButton.innerText = "Mode: Paint";
  }
}

function handleCanvasClick(event) {
  if (filling) {
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleContextMenu(event) {
  event.preventDefault();
}

function handleSaveButtonClick(event) {
  const canvasImage = canvas.toDataURL();
  const downloadLink = document.createElement("a");
  downloadLink.href = canvasImage;
  downloadLink.download = "exportImage"; // 저장할 때 파일 이름
  downloadLink.click();
}

function handleClearButtonClicked(event) {
  //   console.log("save(clear button)");
  updateHistory();
  context.fillStyle = DEFAULT_BACKGROUND_COLOR;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function handleRestoreButtonClicked(event) {
  //   console.log("restore");
  let previousImage = new Image();
  const imageSource = canvasHistory.pop();
  if (imageSource === undefined) {
    console.log("canvasHistory is Empty!");
    return;
  } else {
    previousImage.src = imageSource;
    previousImage.onload = function (event) {
      context.drawImage(previousImage, 0, 0);
    };
  }
}

function updateHistory() {
  canvasHistory.push(canvas.toDataURL());
}

if (canvas.getContext) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleContextMenu);
} else {
  console.log("This Browser does not support Canvas!");
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (brushSize) {
  brushSize.addEventListener("input", handleBrushSizeChange);
}

if (modeButton) {
  modeButton.addEventListener("click", handleModeChange);
}

if (saveButton) {
  saveButton.addEventListener("click", handleSaveButtonClick);
}

if (clearButton) {
  clearButton.addEventListener("click", handleClearButtonClicked);
}

if (restoreButton) {
  restoreButton.addEventListener("click", handleRestoreButtonClicked);
}
