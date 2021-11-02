class Cuboid extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const width = this.hasAttribute("width") ? this.getAttribute("width") : "1";
    const height = this.hasAttribute("height") ? this.getAttribute("height") : "1";
    const depth = this.hasAttribute("depth") ? this.getAttribute("depth") : "1";

    const x = this.hasAttribute("x") ? this.getAttribute("x") : "0";
    const y = this.hasAttribute("y") ? this.getAttribute("y") : "0";
    const z = this.hasAttribute("z") ? this.getAttribute("z") : "0";

    const rotateX = this.hasAttribute("rotateX") ? this.getAttribute("rotateX") : "0";
    const rotateY = this.hasAttribute("rotateY") ? this.getAttribute("rotateY") : "0";
    const rotateZ = this.hasAttribute("rotateZ") ? this.getAttribute("rotateZ") : "0";

    const texture = this.hasAttribute("texture") ? this.getAttribute("texture") : "rgba(0, 0, 0, 0.2)";

    const cssVariables = document.createElement("style");
    cssVariables.textContent = `
      :host {
        --width: ${width}vmin;
        --height: ${height}vmin;
        --depth: ${depth}vmin;

        --x: ${x}vmin;
        --y: ${y}vmin;
        --z: ${z}vmin;

        --rotate-x: ${rotateX}deg;
        --rotate-y: ${rotateY}deg;
        --rotate-z: ${rotateZ}deg;

        --background: ${texture};
      }
    `;

    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "/styles/cuboid.css";

    const faces = [];

    for (let i = 0; i < 6; i++) {
      const face = document.createElement("div");
      face.classList.add("cuboid__face");

      faces.push(face);
    }

    const cuboid = document.createElement("div");
    cuboid.classList.add("cuboid");
    cuboid.append(...faces);

    this.shadowRoot.append(cssVariables, style, cuboid);
  }
}

customElements.define("css-cuboid", Cuboid);
