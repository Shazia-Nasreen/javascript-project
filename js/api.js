const apiKey = "9d285b108d7eb06e4de4e16d20c92787";

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function fetchTopRatedMovies() {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
  try {
    const data = await fetchData(url);
    const topRatedMovies = [];
    const numMovies = Math.min(data.results.length, 10);
    for (let i = 0; i < numMovies; i++) {
      topRatedMovies.push(data.results[i]);
    }
    return topRatedMovies;
  } catch (error) {
    throw new Error("Failed to fetch top rated movies.");
  }
}

export async function fetchPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  try {
    const data = await fetchData(url);
    const popularMovies = [];
    for (let i = 0; i < 10 && i < data.results.length; i++) {
      popularMovies.push(data.results[i]);
    }
    return popularMovies;
  } catch (error) {
    throw new Error("Failed to fetch popular movies.");
  }
}

export async function searchMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=en-US&page=1`;
  try {
    const data = await fetchData(url);
    return data.results;
  } catch (error) {
    throw new Error("Failed to search for movies.");
  }
}

export async function searchTVShows(query) {
  const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&language=en-US&page=1`;
  try {
    const data = await fetchData(url);
    return data.results;
  } catch (error) {
    throw new Error("Failed to search for TV shows.");
  }
}

export async function searchPeople(query) {
  const url = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${query}&language=en-US&page=1`;
  try {
    const data = await fetchData(url);
    return data.results;
  } catch (error) {
    throw new Error("Failed to search for people.");
  }
}
//  fetch a random movie
export async function fetchRandomMovie() {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=release_date.desc,popularity.desc&page=1`;
  try {
    const data = await fetchData(url);
    const randomIndex = Math.floor(Math.random() * data.results.length);
    return data.results[randomIndex];
  } catch (error) {
    throw new Error("Failed to fetch random movie.");
  }
}
// fetch a random movie backdrop image
export async function fetchRandomBackdropImage() {
  try {
    const randomMovie = await fetchRandomMovie();
    const backdropPath = randomMovie.backdrop_path;
    return `https://image.tmdb.org/t/p/original${backdropPath}`;
  } catch (error) {
    console.error("Failed to fetch random backdrop image:", error);
    throw error;
  }
}