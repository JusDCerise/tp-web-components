class CustomDetails extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.getElementById("custom-details").content;
    this.shadowRoot.appendChild(template.cloneNode(true));
    const details = this.shadowRoot.querySelector("details");

    function mouseenter() {
      details.open = true;
    }
    function keyPress(e) {
      if (e.key === "Escape") {
        details.open = false;
      }
    }
    function onFocus() {
      details.open = true;
    }

    this.addEventListener("mouseover", mouseenter);
    document.addEventListener("keydown", keyPress.bind(this));
    this.addEventListener("focus", onFocus);
  }
}

customElements.define("custom-details", CustomDetails);
