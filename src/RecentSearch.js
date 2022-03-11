class RecentSearch {
  constructor({ $target, keywords, onClick }) {
    this.$recentSearch = document.createElement("div");
    this.$recentSearch.className = "RecentSearch";
    this.$target = $target;
    this.keywords = keywords;
    this.onClick = onClick;

    this.render();
  }

  addKeyword(keyword) {
    const storage = window.localStorage;
    if (this.keywords.length >= 5) this.keywords.shift();
    if (!this.keywords.includes(keyword)) {
      this.keywords = this.keywords.concat([keyword]);
      storage.setItem("keywords", this.keyword);
      this.render();
    }
  }

  deleteKeyword(keyword) {
    const storage = window.localStorage;
    this.keywords = this.keywords.filter((v) => v !== keyword);
    storage.setItem("keywords", this.keywords);
    this.render();
  }

  render() {
    this.$recentSearch.innerHTML = "";
    this.keywords.forEach((keyword) => {
      const keywordBadge = document.createElement("div");
      const deleteBtn = document.createElement("span");

      keywordBadge.className = "keyword-badge";
      deleteBtn.className = "delete-badge";

      keywordBadge.innerText = keyword;
      keywordBadge.addEventListener("click", ({ target }) => {
        if (target.className === "keyword-badge") {
          this.onClick(keyword);
        } else if (target.className === "delete-badge") {
          this.deleteKeyword(keyword);
        }
      });

      deleteBtn.innerText = "x";
      keywordBadge.appendChild(deleteBtn);
      this.$recentSearch.appendChild(keywordBadge);
    });
    this.$target.appendChild(this.$recentSearch);
  }
}
