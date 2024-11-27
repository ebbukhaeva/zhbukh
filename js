<!DOCTYPE html>
<html>
<head>
<title>Movie Catalog</title>
<style>
body { font-family: sans-serif; }
#movieCatalog { display: flex; }
#filters { width: 200px; margin-right: 20px; }
#movieList { width: calc(100% - 240px); }
</style>
</head>
<body>

<h1>Movie Catalog</h1>

<div id="movieCatalog">
  <div id="filters">
    <h2>Filters</h2>
    <input type="text" id="searchInput" placeholder="Search movies...">
    <h3>Genre</h3>
    <div id="genreButtons"></div>
    <h3>Sort By</h3>
    <select id="sortBySelect">
      <option value="title">Title</option>
      <option value="year">Year</option>
    </select>
  </div>
  <div id="movieList">
    </div>
</div>

<script>
const movies = [
  // ... (same movie data as before) ...
];

function filterMovies() {
  let filteredMovies = movies;

  //Search filter
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  if (searchTerm) {
    filteredMovies = filteredMovies.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm)
    );
  }

  //Genre filter
  const selectedGenre = document.querySelector('input[name="genre"]:checked');
  const genre = selectedGenre ? selectedGenre.value : '';
  if (genre) {
    filteredMovies = filteredMovies.filter(movie => movie.genre === genre);
  }

  //Sort filter
  const sortBy = document.getElementById("sortBySelect").value;
  filteredMovies.sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'year') {
      return a.year - b.year;
    }
    return 0; // Default sort
  });

  displayMovies(filteredMovies);
}

function displayMovies(moviesToDisplay) {
  const movieList = document.getElementById("movieList");
  movieList.innerHTML = ""; // Clear previous results

  if (moviesToDisplay.length === 0) {
    movieList.innerHTML = "<p>No movies found.</p>";
    return;
  }

  moviesToDisplay.forEach(movie => {
    const li = document.createElement("li");
    li.textContent = `${movie.title} (${movie.year}) - ${movie.genre}`;
    movieList.appendChild(li);
  });
}


const genreButtons = ["Action", "Crime", "Drama", "Fantasy", "Sci-Fi"];
const buttonContainer = document.getElementById("genreButtons");

genreButtons.forEach(genre => {
  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "radio";
  input.name = "genre";
  input.value = genre;
  input.addEventListener('change', filterMovies);
  label.appendChild(input);
  label.appendChild(document.createTextNode(genre));
  buttonContainer.appendChild(label);
});


document.getElementById("searchInput").addEventListener("input", filterMovies);
document.getElementById("sortBySelect").addEventListener("change", filterMovies);

//Initial display
displayMovies(movies);
</script>

</body>
</html>
