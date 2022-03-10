class ImageInfo {
  constructor({ $target, state }) {
    this.$imageInfo = document.createElement("div");
    this.$imageInfo.className = "ImageInfo";
    this.$imageInfo.addEventListener("click", ({ target }) => {
      if (target.className === "close" || target.className === "ImageInfo")
        this.$imageInfo.style.display = "none";
    });
    $target.appendChild(this.$imageInfo);

    this.state = state;

    this.render();
  }

  setState(state) {
    this.state = state;
    this.render();
  }

  render() {
    if (this.state.visible) {
      const { url, name, origin, description } = this.state.data;

      this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${description}</div>
              <div>태생: ${origin}</div>
            </div>
          </div>`;
      this.$imageInfo.style.display = "flex";
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
