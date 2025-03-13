let demo = true;
let currentColor = "red";
let tailEasing = 0.5;

const demoOnBtn = document.getElementById('demoOn');
const demoOffBtn = document.getElementById('demoOff');
const colorPicker = document.getElementById('colorPicker');
const styleSelect = document.getElementById('styleSelect');
const titleEl = document.getElementById('title');

demoOnBtn.addEventListener('click', () => { demo = true; });
demoOffBtn.addEventListener('click', () => { demo = false; });

colorPicker.addEventListener('input', (e) => {
  currentColor = e.target.value;
  cursor.style.backgroundColor = currentColor;
  tails.forEach(tailObj => tailObj.element.style.backgroundColor = currentColor);
});

styleSelect.addEventListener('change', (e) => {
  tailEasing = (e.target.value === "dots") ? 0.1 : 0.5;
});

titleEl.addEventListener('mouseenter', () => {
  cursor.style.backgroundColor = "lightgreen";
  tails.forEach(tailObj => tailObj.element.style.backgroundColor = "lightgreen");
});
titleEl.addEventListener('mouseleave', () => {
  cursor.style.backgroundColor = currentColor;
  tails.forEach(tailObj => tailObj.element.style.backgroundColor = currentColor);
});

document.querySelectorAll('header button, header input, header select').forEach(control => {
  control.addEventListener('mouseenter', () => {
    cursor.style.display = 'none';
    tails.forEach(tailObj => tailObj.element.style.display = 'none');
  });
  control.addEventListener('mouseleave', () => {
    cursor.style.display = 'block';
    tails.forEach(tailObj => tailObj.element.style.display = 'block');
  });
});

const cursor = document.getElementById('customCursor');
const tailCount = 10;
const tails = [];
for (let i = 0; i < tailCount; i++) {
  const tail = document.createElement('div');
  tail.classList.add('tail');
  const size = 20 - i;
  tail.style.width = size + 'px';
  tail.style.height = size + 'px';
  tail.style.opacity = 1 - i / tailCount;
  document.body.appendChild(tail);
  tails.push({ element: tail, x: window.innerWidth / 2, y: window.innerHeight / 2 });
}

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;

document.addEventListener('mousemove', (e) => {
  if (!demo) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
});

function animate() {
  if (demo) {
    const t = Date.now() / 1000;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = 200 + 50 * Math.sin(t * 3);
    mouseX = centerX + radius * Math.cos(t);
    mouseY = centerY + radius * Math.sin(t);
  }
  
  const ease = 0.1;
  cursorX += (mouseX - cursorX) * ease;
  cursorY += (mouseY - cursorY) * ease;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  
  let previousX = cursorX;
  let previousY = cursorY;
  tails.forEach(tailObj => {
    tailObj.x += (previousX - tailObj.x) * tailEasing;
    tailObj.y += (previousY - tailObj.y) * tailEasing;
    tailObj.element.style.left = tailObj.x + 'px';
    tailObj.element.style.top = tailObj.y + 'px';
    previousX = tailObj.x;
    previousY = tailObj.y;
  });
  
  requestAnimationFrame(animate);
}
animate();
