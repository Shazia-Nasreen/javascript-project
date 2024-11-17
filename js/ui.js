export function renderMovieList(movies, containerId, heading) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    // Remove background image
    const body = document.querySelector("body");
    body.style.backgroundImage = "none";
  
    const headingEl = document.createElement("h2");
    headingEl.textContent = heading;
    container.appendChild(headingEl);
  
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
  
    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];
      const card = document.createElement("div");
      card.classList.add("card");
  
      const imgEl = document.createElement("img");
      imgEl.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      imgEl.alt = movie.title;
      card.appendChild(imgEl);
  
      const cardBodyEl = document.createElement("div");
      cardBodyEl.classList.add("card-body");
  
      const titleEl = document.createElement("h3");
      titleEl.textContent = movie.title;
      cardBodyEl.appendChild(titleEl);
  
      const releaseDateEl = document.createElement("p");
      releaseDateEl.textContent = `Release Date: ${movie.release_date}`;
      cardBodyEl.appendChild(releaseDateEl);
  
      card.appendChild(cardBodyEl);
      cardContainer.appendChild(card);
    }
  
    container.appendChild(cardContainer);
  }
  
  export function renderSearchResults(results, containerId, heading) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
  
    // Remove background image
    const body = document.querySelector("body");
    body.style.backgroundImage = "none";
  
    // Add heading if provided
    if (heading) {
      const headingEl = document.createElement("h2");
      headingEl.textContent = heading;
      container.appendChild(headingEl);
    }
  
    // Check if there are any results to render
    if (!results || results.length === 0) {
      container.innerHTML += "<p>No results found.</p>";
      return;
    }
  
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
  
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
  
      const card = document.createElement("div");
      card.classList.add("card");
  
      const imgEl = document.createElement("img");
      imgEl.src = `https://image.tmdb.org/t/p/w500/${
        result.poster_path || result.profile_path
      }`;
      imgEl.alt = result.title || result.name;
      card.appendChild(imgEl);
  
      const cardBodyEl = document.createElement("div");
      cardBodyEl.classList.add("card-body");
  
      const titleEl = document.createElement("h3");
      titleEl.textContent = result.title || result.name;
      cardBodyEl.appendChild(titleEl);
  
      // Check if overview is present to determine media type
      if (result.overview) {
        // If overview is present, assume it's a movie or TV show
        const releaseDateEl = document.createElement("p");
        releaseDateEl.textContent = `Release Date: ${
          result.release_date || "Unknown"
        }`;
        cardBodyEl.appendChild(releaseDateEl);
  
        const overviewEl = document.createElement("p");
        overviewEl.textContent = result.overview;
        cardBodyEl.appendChild(overviewEl);
      } else {
        // Otherwise, assume it's a person
        const knownForEl = document.createElement("p");
        knownForEl.textContent = `Known For: ${
          result.known_for_department || "Unknown"
        }`;
        cardBodyEl.appendChild(knownForEl);
  
        //if known_for is present and not empty
        if (result.known_for && result.known_for.length > 0) {
          // Create a list for known for items
          const knownForList = document.createElement("ul");
  
          for (let j = 0; j < result.known_for.length; j++) {
            const item = result.known_for[j];
            const listItemEl = document.createElement("li");
  
            if (item.media_type === "movie") {
              listItemEl.textContent = `Movie: ${item.title || item.name}`;
            } else if (item.media_type === "tv") {
              listItemEl.textContent = `TV Show: ${item.title || item.name}`;
            } else {
              listItemEl.textContent = `Unknown: ${item.title || item.name}`;
            }
            knownForList.appendChild(listItemEl);
          }
  
          cardBodyEl.appendChild(knownForList);
        }
      }
  
      card.appendChild(cardBodyEl);
  
      cardContainer.appendChild(card);
    }
  
    container.appendChild(cardContainer);
  }
  
  // to render a random movie
  export function renderRandomMovie(movie, containerSelector, heading) {
    const container = document.querySelector(containerSelector);
    container.innerHTML = "";
    // Remove background image
    const body = document.querySelector("body");
    body.style.backgroundImage = "none";
  
    if (heading) {
      const headingEl = document.createElement("h2");
      headingEl.textContent = heading;
      container.appendChild(headingEl);
    }
  
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
  
    const imgEl = document.createElement("img");
    imgEl.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    imgEl.alt = movie.title;
    cardEl.appendChild(imgEl);
  
    const cardBodyEl = document.createElement("div");
    cardBodyEl.classList.add("card-body");
  
    const titleEl = document.createElement("h3");
    titleEl.textContent = movie.title;
    cardBodyEl.appendChild(titleEl);
  
    const releaseDateEl = document.createElement("p");
    releaseDateEl.textContent = `Release Date: ${
      movie.release_date || "Unknown"
    }`;
    cardBodyEl.appendChild(releaseDateEl);
  
    const overviewEl = document.createElement("p");
    overviewEl.textContent = movie.overview;
    cardBodyEl.appendChild(overviewEl);
  
    cardEl.appendChild(cardBodyEl);
  
    container.appendChild(cardEl);
  }
  //  to render the random backdrop image
  export function renderRandomBackdropImage(imageUrl) {
    const body = document.querySelector("body");
    body.style.backgroundImage = `url(${imageUrl})`;
    body.style.backgroundSize = "cover";
  }