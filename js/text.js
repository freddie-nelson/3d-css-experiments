class Text extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const width = this.hasAttribute("width") ? this.getAttribute("width") + "vmin" : "auto";
    const height = this.hasAttribute("height") ? this.getAttribute("height") + "vmin" : "auto";
    const depth = this.hasAttribute("depth") ? this.getAttribute("depth") : "1";

    const x = this.hasAttribute("x") ? this.getAttribute("x") : "0";
    const y = this.hasAttribute("y") ? this.getAttribute("y") : "0";
    const z = this.hasAttribute("z") ? this.getAttribute("z") : "0";
    const center = this.hasAttribute("center");

    const rotateX = this.hasAttribute("rotateX") ? this.getAttribute("rotateX") : "0";
    const rotateY = this.hasAttribute("rotateY") ? this.getAttribute("rotateY") : "0";
    const rotateZ = this.hasAttribute("rotateZ") ? this.getAttribute("rotateZ") : "0";

    const texture = this.hasAttribute("texture") ? this.getAttribute("texture") : "rgba(230, 230, 230, 1)";
    const font = this.hasAttribute("font") ? this.getAttribute("font") : "2.5vmin Arial";
    const shadow = this.hasAttribute("shadow");

    const text = this.textContent;

    const cssVariables = `
      --width: ${width};
      --height: ${height};
      --depth: ${depth}vmin;

      --x: ${x}vmin;
      --y: ${y}vmin;
      --z: ${z}vmin;

      --rotate-x: ${rotateX}deg;
      --rotate-y: ${rotateY}deg;
      --rotate-z: ${rotateZ}deg;

      --background: ${texture};

      --text: "${text}";
      --font: ${font};
    `;

    const style = document.createElement("style");
    style.textContent = `
      .text {
        ${cssVariables}

        position: absolute;
        ${center ? "left: 50%; top: 50%;" : ""}

        transform-origin: 50% 50%;
        transform-style: preserve-3d;
        transform: ${center ? "translate(-50%, -50%)" : ""} 
                   rotateX(var(--rotate-x)) 
                   rotateY(var(--rotate-y)) 
                   rotateZ(var(--rotate-z))
                   translate3d(var(--x), var(--y), var(--z));

        height: var(--depth);
        width: var(--width);

        /* background-color: rgba(255, 0, 180, 0.3); */
        color: var(--color);
        font: var(--font);
      }  

      .text__layer {
        position: absolute;
        left: 50%;
        top: 50%;
        transform-origin: 50% 50%;
        transform-style: preserve-3d;
        transform: translate(-50%, -50%) rotateX(-90deg) translate3d(0, 0, calc(var(--depth) * -1vmin));

        white-space: pre;
        background: var(--background);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: brightness(0.8);
      }

      .text__layer:first-of-type {
        filter: brightness(1);
      }

      .text__shadow {
        position: absolute;
        left: 50%;
        top: 50%;
        transform-style: preserve-3d;
        transform-origin: 50% 50%;
        transform: translate(-50%, -50%) translate3d(0, -.9ch, -.65ch) scaleY(1.5);

        white-space: pre;
        filter: blur(1.6vmin);
        pointer-events: none;
        -webkit-user-drag: none;
        user-drag: none;
        user-select: none;
      }
    `;

    const wrapper = document.createElement("div");
    wrapper.classList.add("text");

    const layers = [];
    const perUnit = 25;
    for (let i = 0; i < depth * perUnit; i++) {
      const layer = document.createElement("div");
      layer.classList.add("text__layer");
      layer.style.cssText += `--depth: ${i/perUnit}; ${i === depth * perUnit - 1 ? "filter: brightness(1);" : ""}`;
      layer.textContent = text;

      layers.push(layer);      
    }
    wrapper.append(...layers);

    if (shadow) {
      const shadow = document.createElement("span");
      shadow.classList.add("text__shadow");
      shadow.textContent = text;

      shadow.setAttribute("draggable", false);
      shadow.onmousedown = () => { e.preventDefault(); return false; }
      shadow.ondragstart = () => { e.preventDefault(); return false; }

      wrapper.appendChild(shadow);
    }

    this.shadowRoot.append(style, wrapper);
  }
}

customElements.define("css-text", Text)