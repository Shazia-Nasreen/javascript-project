import {
    fetchTopRatedMovies,
    fetchPopularMovies,
    searchMovies,
    searchTVShows,
    searchPeople,
    fetchRandomMovie,
    fetchRandomBackdropImage,
  } from "./api.js";
  
  import {
    renderMovieList,
    renderSearchResults,
    renderRandomMovie,
    renderRandomBackdropImage,
  } from "./ui.js";
  
  document
    .getElementById("top-rated-movies-button")
    .addEventListener("click", async () => {
      try {
        const topRatedMovies = await fetchTopRatedMovies();
        renderMovieList(topRatedMovies, "search-results", "Top Rated Movies");
      } catch (error) {
        document.getElementById("search-results").innerHTML =
          "<p>Failed to load top rated movies. Please try again later.</p>";
      }
    });
  
  document
    .getElementById("popular-movies-button")
    .addEventListener("click", async () => {
      try {
        const popularMovies = await fetchPopularMovies();
        renderMovieList(popularMovies, "search-results", "Popular Movies");
      } catch (error) {
        document.getElementById("search-results").innerHTML =
          "<p>Failed to load popular movies. Please try again later.</p>";
      }
    });
  
  document
    .getElementById("random-movie-button")
    .addEventListener("click", async () => {
      try {
        const randomMovie = await fetchRandomMovie();
        renderRandomMovie(randomMovie, "#search-results", "Random Movie");
      } catch (error) {
        document.getElementById("search-results").innerHTML =
          "<p>Failed to get random movie. Please try again later.</p>";
      }
    });
  
  document
    .getElementById("search-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const searchInput = document.getElementById("search-input").value.trim();
      const searchType = document.getElementById("search-type").value;
  
      if (searchInput !== "") {
        try {
          let results;
          let heading = "";
  
          // Search for movies, TV shows, or people based on the selected type
          if (searchType === "movie") {
            results = await searchMovies(searchInput);
            heading = "Movie Information";
          } else if (searchType === "tv") {
            results = await searchTVShows(searchInput);
            heading = "TV Show Information";
          } else if (searchType === "person") {
            results = await searchPeople(searchInput);
            heading = "Person Information";
          }
  
          renderSearchResults(results, "search-results", heading);
        } catch (error) {
          document.getElementById("search-results").innerHTML =
            "<p>Failed to perform search. Please try again later.</p>";
        }
      }
    });
  
  (async () => {
    try {
      const randomBackdropImageUrl = await fetchRandomBackdropImage();
      renderRandomBackdropImage(randomBackdropImageUrl);
    } catch (error) {
      console.error("Failed to fetch random backdrop image:", error);
    }
  })();