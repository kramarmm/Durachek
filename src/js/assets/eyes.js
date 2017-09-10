import '../../css/eyes.css';

let mouseX = 0;
let mouseY = 0;
let xp = 0;
let yp = 0;
const eyes = {};
const pupils = {};

document.addEventListener('DOMContentLoaded', () => {
  eyes.left = document.getElementById('left-eye');
  eyes.right = document.getElementById('right-eye');

  pupils.left = document.getElementById('left-pupil');
  pupils.right = document.getElementById('right-pupil');

  const limitX = eyes.left.offsetWidth - pupils.left.offsetWidth;
  const limitY = eyes.left.offsetHeight - pupils.left.offsetHeight;
  const offset = eyes.left.getBoundingClientRect();

  window.addEventListener('mousemove', (e) => {
    mouseX = Math.min(e.pageX - offset.left, limitX);
    mouseY = Math.min(e.pageY - offset.top, limitY);
    if (mouseX < 0) mouseX = 0;
    if (mouseY < 0) mouseY = 0;
  });
});

export default function moveEyes() {
  xp += Math.round((mouseX - xp) / 5);
  yp += Math.round((mouseY - yp) / 5);
  if (pupils.left && pupils.right) {
    pupils.left.style.left = `${xp}px`;
    pupils.right.style.left = `${xp}px`;
    pupils.left.style.top = `${yp}px`;
    pupils.right.style.top = `${yp}px`;
  }
}
