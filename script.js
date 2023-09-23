const searchButton = document.getElementById("searchBtn");
const loader = document.getElementById("loader");
const resultsDiv = document.getElementById("results");

searchButton.addEventListener("click", async () => {
    const apiKey = document.getElementById("apiKey").value;
    const movieTitle = document.getElementById("movieTitle").value;

    if (apiKey && movieTitle) {
        loader.style.display = "block";
        resultsDiv.innerHTML = "";

        const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${79178629}`;
        console.log(apiUrl);
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.Response === "True") {
                data.Search.forEach(movie => {
                    const card = document.createElement("div");
                    card.className = "card";
                    card.innerHTML = `
                        <img src="${movie.Poster}" alt="${movie.Title} Poster">
                        <div>
                            <h2>${movie.Title}</h2>
                            <p>Year: ${movie.Year}</p>
                            <p>Type: ${movie.Type}</p>
                            <p>IMBDid : ${movie.imdbId}</p>
                            <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">More Details</a>
                        </div>
                    `;
                    resultsDiv.appendChild(card);
                });
            } else {
                resultsDiv.innerHTML = `<p class="error">${data.Error}</p>`;
            }
        } catch (error) {
            resultsDiv.innerHTML = `<p class="error">An error occurred. Please try again later.</p>`;
        } finally {
            loader.style.display = "none";
        }
    } else {
        resultsDiv.innerHTML = `<p class="error">Please fill in both API Key and Movie Title fields.</p>`;
    }
});
