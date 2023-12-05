const API_KEY = "83c980cec0224e9bbe231632d7b7b720";
const url = "https://newsapi.org/v2/everything?q=sports&apiKey=83c980cec0224e9bbe231632d7b7b720";

// Fetch news data from the API
async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news:", error.message);
        throw error;
    }
}

// Display news on the page
function displayNews(news) {
    const newsContainer = document.querySelector(".articles-container");

    // Clear existing content
    newsContainer.innerHTML = "";

    // Loop through the news articles and create HTML elements
    news.forEach((article) => {
        const articleElement = createArticleElement(article);
        newsContainer.appendChild(articleElement);
    });
}

async function fetchImageUrl(urlToImage) {
    try {
        const response = await fetch(urlToImage);
        if (response.ok) {
            return urlToImage;
        } else {
            // Jika gambar tidak tersedia, kembalikan URL gambar default
            return "./img/articles/football1.jpg"; // Ganti dengan path gambar default
        }
    } catch (error) {
        console.error("Error fetching image:", error.message);
        // Jika terjadi kesalahan, kembalikan URL gambar default
        return "./img/articles/football1.jpg"; // Ganti dengan path gambar default
    }
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-photo");
    const category = cardClone.querySelector(".category");
    const newsTitle = cardClone.querySelector("h3 a");
    const newsDesc = cardClone.querySelector("p");

    // Panggil fungsi fetchImageUrl untuk mendapatkan URL gambar
    newsImg.src = article.urlToImage;
    // Set nilai kategori
    category.textContent = article.source.name;

    // Set nilai judul
    newsTitle.textContent = article.title;
    // Set nilai deskripsi
    newsDesc.textContent = article.description;

    // Menambahkan event listener untuk membuka artikel saat card diklik
    cardClone.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

// Create an article element with data from the API
function createArticleElement(article) {
    const articleElement = document.createElement("article");
    articleElement.classList.add("card");

    // Check if the article has an image
    if (article.urlToImage) {
        const imgElement = document.createElement("news-photo");
        imgElement.src = article.urlToImage;
        imgElement.alt = "photo";
        articleElement.appendChild(imgElement);
    }

    // Create category div
    const categoryElement = document.createElement("div");
    categoryElement.classList.add("category");
    categoryElement.textContent = article.source.name;
    articleElement.appendChild(categoryElement);

    // Create heading (h3)
    const headingElement = document.createElement("h3");
    const headingLinkElement = document.createElement("a");
    headingLinkElement.href = article.url;
    headingLinkElement.textContent = article.title;
    headingElement.appendChild(headingLinkElement);
    articleElement.appendChild(headingElement);

    // Create paragraph (p)
    const paragraphElement = document.createElement("p");
    paragraphElement.textContent = article.description;
    articleElement.appendChild(paragraphElement);

    return articleElement;
}

// Fetch news and display on page load
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const news = await fetchNews();
        displayNews(news);
    } catch (error) {
        console.error("Failed to load news:", error.message);
    }
});
