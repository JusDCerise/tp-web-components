class ScreenSize extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const head = document.querySelector("head");
    this.innerHTML += `
          <style>
              screen-size {
                  position: fixed;
                  right: 10px;
                  top: 10px;
                  display: flex;
                  gap: 10px;
              }
              .changeFormat{
                color: red;
              }
          </style>
      `;

    this.render();
    this.ViewportRender();

    const changeButton = this.shadowRoot.querySelector(".changeFormat");
    changeButton.addEventListener("click", () => {
      console.log("click");
      this.changeFormat();
    });

    window.addEventListener("resize", () => {
      this.ViewportRender();
    });
  }

  static get observedAttributes() {
    return ["format"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "format") {
      this.format = newVal;
    }
    this.render();
  }

  render() {
    console.log(this.format);
    this.shadowRoot.innerHTML = this.format === "rem" ? `<unit class="size">${window.innerWidth * 0.0625}rem</unit>` : `<unit class="size">${window.innerWidth}px</unit>`;
    this.shadowRoot.innerHTML += `<button class="changeFormat">change to ${this.format === "rem" ? "px" : "rem"}</button>`;
  }

  ViewportRender() {
    const size = this.shadowRoot.querySelector(".size");
    size.innerHTML = this.format === "rem" ? `${window.innerWidth * 0.0625}rem` : `${window.innerWidth}px`;
  }

  changeFormat() {
    console.log("click");
    this.format = this.format === "rem" ? "px" : "rem";

    changeButton.textContent = this.format === "rem" ? "change to px" : "change to rem";
    this.ViewportRender();
  }
}

customElements.define("screen-size", ScreenSize);


