import styleSource from "../styles/cards.scss";

class Cards extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    if (!this.shadowRoot) return;

    const count = this.hasAttribute("count") ? this.getAttribute("count") : "7";

    const width = this.hasAttribute("width") ? this.getAttribute("width") : "5.6";
    const height = this.hasAttribute("height") ? this.getAttribute("height") : "8.9";

    const x = this.hasAttribute("x") ? this.getAttribute("x") : "0";
    const y = this.hasAttribute("y") ? this.getAttribute("y") : "0";
    const z = this.hasAttribute("z") ? this.getAttribute("z") : "0";

    const rotateX = this.hasAttribute("rotateX") ? this.getAttribute("rotateX") : "90";
    const rotateY = this.hasAttribute("rotateY") ? this.getAttribute("rotateY") : "0";
    const rotateZ = this.hasAttribute("rotateZ") ? this.getAttribute("rotateZ") : "0";

    const texture = this.hasAttribute("texture") ? this.getAttribute("texture") : "#FFF";

    const cssVariables = document.createElement("style");
    cssVariables.textContent = `
      :host {
        --count: ${count};

        --width: ${width}vmin;
        --height: ${height}vmin;

        --x: ${x}vmin;
        --y: ${y}vmin;
        --z: ${z}vmin;

        --rotate-x: ${rotateX}deg;
        --rotate-y: ${rotateY}deg;
        --rotate-z: ${rotateZ}deg;

        --texture: ${texture};
      }
    `;

    const style = document.createElement("style");
    style.textContent = styleSource;

    const container = document.createElement("div");
    container.classList.add("cards");

    for (let i = 0; i < Number(count); i++) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.style.cssText = `--index: ${i + 0.5}`;
      container.appendChild(card);
    }

    this.shadowRoot.append(cssVariables, style, container);
  }
}

customElements.define("css-cards", Cards);
