// class constructor에서 초기화 전에 함수 선언문은 이미 함수 객체가 생성되어 있다.

class SearchResult {
  $searchResult = null;

  constructor({ $target, data, onClick }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = data;
    this.onClick = onClick;

    this.render();
  }

  setState(data) {
    this.data = data;
    this.render();
  }

  render() {
    this.$searchResult.innerHTML = this.data
      .map(({ url, breeds }) => {
        const name = breeds[0]?.name;
        return `
            <div class="item">
                <img src=${url} alt=${name}/>
            </div>
        `;
      })
      .join("");

    // TODO: event delegation
    this.$searchResult.querySelectorAll(".item").forEach((image, index) => {
      image.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
    });
  }
}
