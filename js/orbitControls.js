class OrbitControls {
  rotateX = 0;
  rotateY = 0;

  mouseX = 0;
  mouseY = 0;

  anchorX = 0;
  anchorY = 0;

  lastX = 0;
  lastY = 0;

  cursorX = 0;
  cursorY = 0;

  rotateX = -20;
  rotateY = 0;

  sensitivity = 150;

  element;

  constructor(element, spin) {
    this.element = element;
    element.style.cssText = `--rotate-x: ${this.rotateX}; --rotate-y: ${this.rotateY};`

    // event listeners
    document.body.addEventListener("mousedown", (e) => { 
      this.dragging = true; 
      this.anchorX = e.clientX; 
      this.anchorY = e.clientY;
      this.lastX = e.clientX; 
      this.lastY = e.clientY;
    });
    document.body.addEventListener("mousemove", (e) => {
      if (!this.dragging) return;

      this.cursorX = e.clientX; 
      this.cursorY = e.clientY;
      this.orbit();
    });
    document.body.addEventListener("mouseup", (e) => { 
      this.dragging = false;
    });

    // spin animation
    if (spin) {
      this.spin();
    }
  }

  spin() {
    requestAnimationFrame(() => this.spin());
    if (this.dragging) return; 

    const direction = Math.sign(this.cursorX - this.anchorX) || -1;
    this.rotateY += 0.001 * this.sensitivity * direction;
    this.element.style.cssText = `--rotate-x: ${this.rotateX}; --rotate-y: ${this.rotateY};`
  }

  orbit() {
    const diffX = this.cursorX - this.lastX;
    const diffY = this.cursorY - this.lastY;

    this.rotateX -= diffY / window.innerHeight * this.sensitivity;
    this.rotateY += diffX / window.innerWidth * this.sensitivity;

    this.element.style.cssText = `--rotate-x: ${this.rotateX}; --rotate-y: ${this.rotateY};`

    this.lastX = this.cursorX;
    this.lastY = this.cursorY;
  }
}

const orbitElement = document.getElementById("orbit-controls");
if (orbitElement) new OrbitControls(orbitElement, orbitElement.hasAttribute("spin"));