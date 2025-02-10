document.getElementById("fetch-button").addEventListener("click", fetchData);

const typeAnime = document.getElementById("type_anime")
const statusAnime = document.getElementById("status_anime")
const ratingAnime = document.getElementById("rating_anime")


async function fetchData() {

    let input_type = typeAnime.value
    let input_status = statusAnime.value
    let input_rating = ratingAnime.value

    console.log(input_rating);
    console.log(input_status);
    console.log(input_type);
    

    renderLoadingState(); //Se le ve al user que está cargando
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${input_type}&q=${input_status}&q=${input_rating}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        renderData(data);
    } catch (error) {
        renderErrorState();
    }

}


function renderErrorState() {
    const container = document.getElementById("anime-container");
    container.innerHTML = ""; // Clear previous data
    container.innerHTML = "<h1>Failed to load data</h1>";
    console.log("Failed to load data");
  }
  
  function renderLoadingState() {
    const container = document.getElementById("anime-container");
    container.innerHTML = ""; // Clear previous data
    container.innerHTML = "<p>Loading...</p>";
    console.log("Loading...");
  }
  
  function renderData(data) {
//     const container = document.getElementById("anime-container");
//     container.innerHTML = ""; // Clear previous data

//     data.forEach(element => {
//         element.images
//     });

//     const div = document.createElement("div");
//     div.className = "item";
//     div.innerHTML = data.rating;
//     container.appendChild(div);
//   }

//   function data (data){


  }