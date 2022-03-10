const BASE_URL = "https://api.thecatapi.com/v1";

const request = async (url) => {
  try {
    const res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("response error");
    }
  } catch (err) {}
};

const api = {
  fetchCats: async (keyword) => {
    const breeds = await request(`${BASE_URL}/breeds/search?q=${keyword}`);
    const requests = breeds.map(async ({ id }) => {
      return await request(
        `${BASE_URL}/images/search?limit=20&breed_ids=${id}`
      );
    });
    const cats = Promise.all(requests);
    const result = (await cats).reduce((acc, cat) => {
      return acc.concat(cat);
    }, []);
    return result;
  },
};
