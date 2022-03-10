class App {
  data = [];

  constructor($target) {
    this.$target = $target;

    new ThemeToggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        const cats = await api.fetchCats(keyword);
        this.setState(cats);
      },
    });

    this.searchResult = new SearchResult({
      $target,
      data: this.data,
      onClick: (data) => {
        this.imageInfo.setState({
          visible: true,
          data: {
            url: data.url,
            name: data.breeds[0].name,
            origin: data.breeds[0].origin,
            description: data.breeds[0].description,
          },
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      state: {
        visible: false,
        data: null,
      },
    });
  }

  setState(data) {
    this.data = data;
    this.searchResult.setState(data);
  }
}
