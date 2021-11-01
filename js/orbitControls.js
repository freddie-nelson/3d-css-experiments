class OrbitControls {
  rotateX = 0;
  rotateY = 0;

  mouseX = 0;
  mouseY = 0;

  lastX = 0;
  lastY = 0;

  cursorX = 0;
  cursorY = 0;

  rotateX = -20;
  rotateY = 0;

  sensitivity = 150;

  element;

  constructor(element) {
    this.element = element;
    element.style.cssText = `--rotate-x: ${this.rotateX}; --rotate-y: ${this.rotateY};`

    document.body.addEventListener("mousedown", (e) => { 
      this.dragging = true; 
      this.lastX = e.clientX; 
      this.lastY = e.clientY;
    });

    document.body.addEventListener("mousemove", (e) => {
      if (!this.dragging) return;

      this.cursorX = e.clientX; 
      this.cursorY = e.clientY;
      this.orbit();
    });

    document.body.addEventListener("mouseup", () => { this.dragging = false; });
  }

  orbit() {
    const diffX = this.cursorX - this.lastX;
    const diffY = this.cursorY - this.lastY;

    this.rotateX -= diffY / window.innerHeight * this.sensitivity;
    this.rotateY += diffX / window.innerWidth * this.sensitivity;

    element.style.cssText = `--rotate-x: ${this.rotateX}; --rotate-y: ${this.rotateY};`

    this.lastX = this.cursorX;
    this.lastY = this.cursorY;
  }
}

const element = document.getElementById("orbit-controls");
if (element) new OrbitControls(element);