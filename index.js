// 

// API ANIME
document.getElementById("fetch-button").addEventListener("click", fetchData);

const typeAnime = document.getElementById("type_anime");
const statusAnime = document.getElementById("status_anime");
const ratingAnime = document.getElementById("rating_anime");


async function fetchData() {

    let input_raiting = ratingAnime.value;
    let input_status = statusAnime.value;
    let input_type = typeAnime.value;

    renderLoadingState();
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${input_raiting}&q=${input_status}&q=${input_type}`);
        if (!response.ok) {
            throw new Error("El api no está bien");
        }
        const data = await response.json();
        renderData(data)
    } catch (error) {
        renderErrorState();
    }
}

function renderErrorState() {
    const container = document.getElementById("anime-container");
    container.innerHTML = "";
    container.innerHTML = "<p>Error al cargar la data</p>";
    console.log("Error al cargar el contenido");
}

function renderLoadingState() {
    const container = document.getElementById("anime-container");
    container.innerHTML = ""; 
    container.innerHTML = "<p>Cargando...</p>";
    console.log("Cargando...");
}

function renderData(animeData) {
    const container = document.getElementById("anime-container");
    container.innerHTML = ""; // Clear previous data

    animeData.data.forEach((anime) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h2>${anime.title}</h2>
        <p><b>Year:</b> ${anime.year}</p>
        <p><b>Type:</b> ${anime.type}</p>
        <p><b><Status:/b> ${anime.status}</p>
        <p><b>Episodes:</b> ${anime.episodes}</p>
        <p><b>Duration:</b> ${anime.duration}</p>
        <p><b>Rating:</b> ${anime.rating}</p>
      `;
      container.appendChild(card);
    });
}