class ZoomControls {
  zoom = 1;
  minZoom = 0.1;
  maxZoom = 2;
  sensitivity = 0.001;
  
  startPerspective = 1000;
  perspective = this.startPerspective;
  minPerspective = 100;
  maxPerspective = 3000;

  element;

  constructor(element) {
    this.element = element;
    element.style.cssText = `--perspective: ${this.perspective / this.zoom};`

    element.addEventListener("wheel", (e) => { 
      if (e.ctrlKey) {
        e.preventDefault();

        this.zoom += e.deltaY * this.sensitivity;
        this.zoom = Math.min(Math.max(this.zoom, this.minZoom), this.maxZoom);

        this.perspective = this.startPerspective * this.zoom;
        element.style.cssText = `--perspective: ${this.perspective};`
      }
    }, { passive: false });
  }
}

const zoomElement = document.getElementById("zoom-controls");
if (zoomElement) new ZoomControls(zoomElement);