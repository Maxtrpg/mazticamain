/* ======================================================
   Maztica Dynamic Background (background.js)
   ====================================================== */

// 建立靜態層（漸層 + 霧氣 + Canvas）
const grad = document.createElement("div");
grad.className = "bg-gradient";
const fog = document.createElement("div");
fog.className = "bg-fog";
const canvas = document.createElement("canvas");
canvas.id = "bg-canvas";
document.body.prepend(canvas);
document.body.prepend(fog);
document.body.prepend(grad);

const c = canvas.getContext("2d");
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// 建立光點粒子
const particles = Array.from({ length: 70 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 0.5,
  dx: (Math.random() - 0.5) * 0.3,
  dy: (Math.random() - 0.5) * 0.3,
  c: `rgba(255, ${200 + Math.random() * 30}, ${120 + Math.random() * 40}, ${0.06 + Math.random() * 0.08})`
}));

function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    c.beginPath();
    c.fillStyle = p.c;
    c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    c.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(draw);
}
draw();
