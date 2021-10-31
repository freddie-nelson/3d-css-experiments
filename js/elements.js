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

    const cssVariables = `
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
    `;

    const style = document.createElement("style");
    style.textContent = `
      .cuboid {
        ${cssVariables}

        position: absolute;
        transform-style: preserve-3d;
        transform: translate3d(var(--x), var(--y), var(--z))
                   rotateX(var(--rotate-x)) 
                   rotateY(var(--rotate-y)) 
                   rotateZ(var(--rotate-z));

        height: var(--depth);
        width: var(--width);

        /* background-color: rgba(255, 0, 180, 0.3); */
      }   
      
      .cuboid__face {
        background: var(--background);
        position: absolute;
        transform-origin: 50% 50%;
        position: absolute;
        top: 50%;
        left: 50%;
      }

      /* Front face */
      .cuboid__face:nth-of-type(1) {
        height: var(--height);
        width: var(--width);
        transform: translate(-50%, -50%) rotateX(-90deg) translate3d(0, 0, calc(var(--depth) * 0.5));
      }
      
      /* Back face */
      .cuboid__face:nth-of-type(2) {
        height: var(--height);
        width: var(--width);
        transform: translate(-50%, -50%) rotateX(90deg) rotateZ(180deg) translate3d(0, 0, calc(var(--depth) * 0.5));
      }

      /* Right face */
      .cuboid__face:nth-of-type(3) {
        height: var(--height);
        width: var(--depth);
        transform: translate(-50%, -50%) rotateY(90deg) rotateZ(-90deg) translate3d(0, 0, calc(var(--width) * 0.5));
      }

      /* Left face */
      .cuboid__face:nth-of-type(4) {
        height: var(--height);
        width: var(--depth);
        transform: translate(-50%, -50%) rotateY(-90deg) rotateZ(90deg) translate3d(0, 0, calc(var(--width) * 0.5));
      }

      /* Top face */
      .cuboid__face:nth-of-type(5) {
        height: var(--depth);
        width: var(--width);
        transform: translate(-50%, -50%) translate3d(0, 0, calc(var(--height) * 0.5));
      }

      /* Bottom face */
      .cuboid__face:nth-of-type(6) {
        height: var(--depth);
        width: var(--width);
        transform: translate(-50%, -50%) rotateY(180deg) translate3d(0, 0, calc(var(--height) * 0.5));
      }
    `;


    const faces = [];

    for (let i = 0; i < 6; i++) {
      const face = document.createElement("div");
      face.classList.add("cuboid__face");

      faces.push(face);
    }

    const cuboid = document.createElement("div");
    cuboid.classList.add("cuboid");
    cuboid.append(...faces);

    this.shadowRoot.append(style, cuboid);
  }
}

customElements.define("css-cuboid", Cuboid)