class SearchInput {
  constructor({ $target, onSearch = () => {} }) {
    const $searchInput = document.createElement("input");
    $searchInput.placeholder = "고양이를 검색해보세요";
    this.$searchInput = $searchInput;

    $searchInput.className = "SearchInput";
    $searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) onSearch(e.target.value);
    });
    $target.appendChild($searchInput);
  }
}
