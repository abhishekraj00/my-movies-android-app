export const MoviesApi =
  "http://www.omdbapi.com/?apikey=9e10ee12&type=movie&s=";

export const SeriesApi =
  "http://www.omdbapi.com/?apikey=9e10ee12&type=series&s=";

export const Episode =
  "http://www.omdbapi.com/?apikey=9e10ee12&type=episode&t=[title]&season=[season]&episode=[episode]";

export const getData = (url: string, text: string) => {
  fetch(url + text)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((result) => {
      return result.Search;
    })
    .catch((err) => {
      console.log(err);
    });
};
