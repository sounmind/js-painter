const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const brushSize = document.getElementById("jsBrushSize");
const defaultLineWidth = 5;

canvas.width = 700;
canvas.height = 700;
context.strokeStyle = "black";
context.lineWidth = defaultLineWidth;

let painting = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
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
    context.lineTo(x, y);
    context.stroke();
  }
}

function onMouseDown(event) {
  painting = true;
}

function handleColorClick(event) {
  const colorClicked = event.target.style.backgroundColor;
  context.strokeStyle = colorClicked;
}

function handleBrushSizeChange(event) {
  const brushSizeChanged = event.target.value;
  context.lineWidth = brushSizeChanged;
}

if (canvas.getContext) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
} else {
  console.log("This Browser does not support Canvas!");
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (brushSize) {
  brushSize.addEventListener("input", handleBrushSizeChange);
}
