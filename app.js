const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;
context.strokeStyle = "black";
context.lineWidth = 2.5;

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

if (canvas.getContext) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
} else {
  console.log("This Browser does not support Canvas!");
}
