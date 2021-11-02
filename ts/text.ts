import styleSource from "/styles/text.scss";

class Text3D extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    if (!this.shadowRoot) return;

    const width = this.hasAttribute("width") ? this.getAttribute("width") + "vmin" : "auto";
    const height = this.hasAttribute("height") ? this.getAttribute("height") + "vmin" : "auto";
    const depth = this.getAttribute("depth") || "1";

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

    const cssVariables = document.createElement("style");
    cssVariables.textContent = `
      :host {
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

        ${center ? "--center-transform: translate(-50%, -50%); --center-pos: 50%;" : "--center-pos: auto;" }
      }
    `;

    const style = document.createElement("style");
    style.textContent = styleSource;

    const wrapper = document.createElement("div");
    wrapper.classList.add("text");

    const layers = [];
    const perUnit = 25;
    for (let i = 0; i < Number(depth) * perUnit; i++) {
      const layer = document.createElement("div");
      layer.classList.add("text__layer");
      layer.style.cssText += `--depth: ${i/perUnit}; ${i === (Number(depth) * perUnit - 1) ? "filter: brightness(1);" : ""}`;
      layer.textContent = text;

      layers.push(layer);      
    }
    wrapper.append(...layers);

    if (shadow) {
      const shadow = document.createElement("span");
      shadow.classList.add("text__shadow");
      shadow.textContent = text;

      shadow.setAttribute("draggable", "false");
      shadow.onmousedown = (e) => { e.preventDefault(); return false; }
      shadow.ondragstart = (e) => { e.preventDefault(); return false; }

      wrapper.appendChild(shadow);
    }

    this.shadowRoot.append(cssVariables, style, wrapper);
  }
}

customElements.define("css-text", Text3D)