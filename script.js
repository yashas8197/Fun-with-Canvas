const canvas = document.querySelector('#draw')
const ctx = canvas.getContext('2d');
const clear = document.querySelector('#clear')

canvas.width = window.innerWidth;
canvas.heigth = window.innerHeight;

ctx.strokeStyle = '#BADASS';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let isDrawing = false
let lastX = 0
let lastY = 0
let hue = 0
let direction = false;

function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  //start from x = 0, y= 0
  ctx.moveTo(lastX, lastY);
  //go to x = offsetX, y = offsetY
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;
  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }


}
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

clear.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})

