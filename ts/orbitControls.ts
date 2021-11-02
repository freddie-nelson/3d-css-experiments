class OrbitControls {
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
  dragging = false;
  disableX = false;
  disableY = false;

  element;

  constructor(element: HTMLElement, spin = false) {
    this.element = element;
    this.updateElementStyle();

    // event listeners
    document.body.addEventListener("mousedown", (e) => { 
      this.dragging = true; 

      if (!this.disableY) {
        this.anchorX = e.clientX; 
        this.lastX = e.clientX; 
        
      }
      if (!this.disableX) {
        this.anchorY = e.clientY;
        this.lastY = e.clientY;
      }
    });
    document.body.addEventListener("mousemove", (e) => {
      if (!this.dragging) return;

      if (!this.disableY) this.cursorX = e.clientX; 
      if (!this.disableX) this.cursorY = e.clientY;
      this.orbit();
    });
    document.body.addEventListener("mouseup", () => { 
      this.dragging = false;
    });

    // spin animation
    if (spin) {
      this.spin();
    }

    // disable rotation axes
    this.disableX = element.hasAttribute("disableX");
    this.disableY = element.hasAttribute("disableY");
  }

  spin() {
    requestAnimationFrame(() => this.spin());
    if (this.dragging) return; 

    const direction = Math.sign(this.cursorX - this.anchorX) || -1;
    this.rotateY += 0.001 * this.sensitivity * direction;
    this.updateElementStyle();
  }

  orbit() {
    const diffX = this.cursorX - this.lastX;
    const diffY = this.cursorY - this.lastY;

    this.rotateX -= diffY / window.innerHeight * this.sensitivity;
    this.rotateY += diffX / window.innerWidth * this.sensitivity;

    this.updateElementStyle();

    this.lastX = this.cursorX;
    this.lastY = this.cursorY;
  }

  updateElementStyle() {
    let vars = ``;
    vars += !this.disableX ? `--rotate-x: ${this.rotateX}` : "";
    vars += !this.disableY ? `--rotate-y: ${this.rotateY}` : "";
    this.element.style.cssText = vars;
  }
}

const orbitElement = document.getElementById("orbit-controls");
if (orbitElement) new OrbitControls(orbitElement, orbitElement.hasAttribute("spin"));