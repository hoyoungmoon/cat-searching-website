class SearchInput {
  constructor({ $target, onSearch = () => {} }) {
    const container = document.createElement("div");
    container.className = "column-container";

    const $searchInput = document.createElement("input");
    this.$recentSearch = new RecentSearch({
      $target: container,
      keywords: [],
      onClick: onSearch,
    });

    $searchInput.placeholder = "고양이를 검색해보세요";
    this.$searchInput = $searchInput;

    $searchInput.className = "SearchInput";
    $searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        this.$recentSearch.addKeyword(e.target.value);
        onSearch(e.target.value);
      }
    });

    container.appendChild($searchInput);
    $target.appendChild(container);
  }
}
