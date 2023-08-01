class Element {
  constructor(id, game) {
    this.id = id;
    this.revealed = false;
    this.element = document.createElement("div");
    this.element.className = "grid-element";
    this.element.classList.add("disabled");
    this.element.addEventListener("click", () => this.interact(game));
  }
  interact(game) {
    if (game.revealedElements.length === 2) {
      return;
    }

    if (this.revealed) return;
    this.revealed = true;

    anime({
      targets: this.element,
      scale: [
        { value: 1, easing: "easeInOutSine", duration: 100 },
        { value: 1.2, easing: "easeInOutSine", duration: 100 },
        { value: 1, easing: "easeInOutSine", duration: 100 },
      ],
      backgroundColor: [
        { value: "#1195dcd9", easing: "linear", duration: 100 },
        { value: "#1195dcd9", easing: "linear", duration: 100 },
        { value: "#1195dcd9", easing: "linear", duration: 100 },
      ],
      easing: "easeInOutSine",
      duration: 500,
      complete: () => {
        this.element.style.backgroundColor = "";
        this.element.classList.add("revealed");
        this.element.innerText = this.id;
      },
    });

    this.element.innerText = this.id;

    game.addToRevealedElements(this);

    setTimeout(() => {
      game.checkMatchingElements();
    }, 100);
  }

  reset() {
    this.revealed = false;
    this.element.innerText = "";
    this.element.classList.remove("matched");
  }
}

export default Element;
