// class constructor에서 초기화 전에 함수 선언문은 이미 함수 객체가 생성되어 있다.

class SearchResult {
  loading = false;
  $searchResult = null;

  constructor({ $target, data, onClick }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    this.$indicator = document.createElement("span");

    $target.appendChild(this.$searchResult);
    $target.appendChild(this.$indicator);

    this.data = data;
    this.onClick = onClick;

    this.render();
  }

  setState({ loading, data }) {
    this.loading = loading;
    this.data = data;
    this.render();
  }

  render() {
    this.$searchResult.innerHTML = "";
    this.data.forEach(({ url }) => {
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("item");

      const card = document.createElement("img");
      card.classList.add("lazy");
      card.dataset.url = url;

      cardContainer.appendChild(card);
      this.$searchResult.appendChild(cardContainer);
    });

    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.url;
          lazyImage.classList.remove("lazy");
          observer.unobserve(lazyImage);
        }
      });
    });

    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    lazyImages.forEach((image) => {
      lazyImageObserver.observe(image);
    });

    // search indicator
    this.$indicator.innerText = this.loading
      ? "검색 중 입니다..."
      : this.data.length
      ? ""
      : "검색 결과가 없습니다";

    // TODO: event delegation
    this.$searchResult.querySelectorAll(".item").forEach((image, index) => {
      image.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
    });
  }
}
