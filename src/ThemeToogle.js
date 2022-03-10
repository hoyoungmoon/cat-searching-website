class ThemeToggle {
  constructor({ $target }) {
    this.$themeToggle = document.createElement("span");

    // apply initial theme
    const initialTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    this.$themeToggle.innerText = initialTheme === "light" ? "🌕" : "🌑";
    document.body.dataset.theme = initialTheme;

    this.$themeToggle.addEventListener("click", () => {
      const isDark = document.body.dataset.theme === "dark";
      this.$themeToggle.innerText = isDark ? "🌕" : "🌑";
      document.body.dataset.theme = isDark ? "light" : "dark";
    });

    $target.appendChild(this.$themeToggle);
  }
}
