class Eyes {
  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;

    this.xp = 0;
    this.yp = 0;

    this.eyes = {};
    this.eyeDots = {};

    this.startMoving = this.startMoving.bind(this);
  }

  init() {
    this.eyes.left = document.getElementById('left-eye');
    this.eyes.right = document.getElementById('right-eye');

    this.eyeDots.left = document.getElementById('left-pupil');
    this.eyeDots.right = document.getElementById('right-pupil');

    const limitX = this.eyes.left.offsetWidth - this.eyeDots.left.offsetWidth;
    const limitY = this.eyes.left.offsetHeight - this.eyeDots.left.offsetHeight;
    const offset = this.eyes.left.getBoundingClientRect();

    window.addEventListener('mousemove', e => {
      this.mouseX = Math.min(e.pageX - offset.left, limitX);
      this.mouseY = Math.min(e.pageY - offset.top, limitY);
      if (this.mouseX < 0) this.mouseX = 0;
      if (this.mouseY < 0) this.mouseY = 0;
    });
  }

  moveEyes() {
    this.xp += Math.round((this.mouseX - this.xp) / 5);
    this.yp += Math.round((this.mouseY - this.yp) / 5);

    if (this.eyeDots.left && this.eyeDots.right) {
      this.eyeDots.left.style.left = `${this.xp}px`;
      this.eyeDots.right.style.left = `${this.xp}px`;
      this.eyeDots.left.style.top = `${this.yp}px`;
      this.eyeDots.right.style.top = `${this.yp}px`;
    }
  }

  startMoving() {
    this.moveEyes();
    requestAnimationFrame(this.startMoving);
  }
}

const eyes = new Eyes();

document.addEventListener(
  'DOMContentLoaded',
  eyes.init.bind(eyes),
);

export default eyes;
