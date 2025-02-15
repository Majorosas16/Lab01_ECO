const buttonUser = document.getElementById("user-button").addEventListener("click", fetchDataUser);
const containerUser = document.getElementById("user-container");
const food_button = document.getElementById("emoji-button").addEventListener("click", fetchDataEmoji);
const containerEmoji = document.getElementById("emoji-container");

// RANDOM PHONE AND USER

async function fetchDataUser() {
    renderLoadingState();
    try {
      const response = await fetch("https://randomuser.me/api/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    const data = await response.json();
    renderUser(data);
      
    } catch (error) {
      renderErrorState();
    }
  }

  const renderUser = (data) => {
    containerUser.innerHTML = "";

    if (!data.results || data.results.length === 0) {
      containerUser.innerHTML = "<p>¡Ops! Something happened, try again</p>";
        return;
    }

    const txt = document.createElement("p");
    const txt2 = document.createElement("p");
    const img = document.createElement("img");
    img.src=`${data.results[0].picture.large}`;
    img.alt=`${data.results[0].name.title}`;
    txt2.innerHTML = `Country:     ${data.results[0].location.country}`;
    txt.innerHTML = `Phone: ${data.results[0].phone}`;
    containerUser.appendChild(txt);
    containerUser.appendChild(txt2)
    containerUser.appendChild(img)
  }

// API RANDOM EMOJI

async function fetchDataEmoji() {
    renderLoadingState();
    try {
      const response = await fetch("https://emojihub.yurace.pro/api/random/category/food-and-drink");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    const data = await response.json();
    renderEmoji(data);
      
    } catch (error) {
      renderErrorState();
    }
  }

 function renderEmoji (data) {
    containerEmoji.innerHTML = ""; // Clear previous data

    if (!data.name || data.name.length === 0) {
      containerEmoji.innerHTML = "<p>No data available</p>";
        return;
    }

    const txt = document.createElement("p");
    txt.innerHTML = `${data.name}`;
    containerEmoji.appendChild(txt);
}

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
            throw new Error("Network response was not ok");
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
    container.innerHTML = "<p>Ops!, something happened</p>";
}

function renderLoadingState() {
    const container = document.getElementById("anime-container");
    container.innerHTML = ""; 
    container.innerHTML = "<p>Loading...</p>";
}

function renderData(animeData) {
    const container = document.getElementById("anime-container");
    container.innerHTML = "";

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