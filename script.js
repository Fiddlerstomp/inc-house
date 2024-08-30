const baseURL = "https://live.verstaem.online/house/";
const baseCountry = "France";
let catalog = [];

function loadCatalog(country) {
    const list = document.getElementById("catalog-list");
    list.innerHTML = "";
    for (item of catalog) {
        if (item.country === country) {
            list.innerHTML += `
                <li key=${item.id} class="catalog__item">
                    <div class="card-art">
                        <img src="${baseURL + item.cover.desktop}" alt>
                        <div class="product__content">
                            <p class="product__author">${item.author}</p>
                            <h3 class="product__title">${item.title}</h3>
                            <p class="product__params">${item.props}</p>
                            <p class="product__price">${item.price} руб</p>
                            <button class="btn primary-btn product-btn">В корзину</button>
                        </div>
                    </div>
                </li>
            `
        }
    }
}

function getData() {
    fetch("data.json")
        .then((res) => {
            return res.json();
        }).then((data) => {
            catalog = data;
            loadCatalog(baseCountry);
        });
}

window.onload = () => {
    const catalogButtons = document.querySelectorAll(".tab-btn");
    getData();
    catalogButtons.forEach(btn => {
        btn.addEventListener("click", (event) => {
            const country = event.target.dataset.country;
            event.target.classList.add("tab-btn--active");
            catalogButtons.forEach(btn => {
                if (btn.dataset.country !== country)
                    btn.classList.remove("tab-btn--active")
            })
            loadCatalog(country);
        })
    })
}