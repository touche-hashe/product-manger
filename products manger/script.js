let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.querySelector(".submit");
let total = document.querySelector(".total");
let searchCategory = document.getElementById("searchTite");
let searchTitle = document.getElementById("searchCategory");
let search = document.getElementById("search");

let mode = "create";
let tempIndex;
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;

    total.textContent = result;
  } else {
    total.textContent = "";
  }
  if (total.textContent != "") {
    total.style.backgroundColor = "#040";
  } else if (total.textContent == "") {
    total.style.backgroundColor = "red";
  }
}

let arrProducts;
if (localStorage.product != null) {
  arrProducts = JSON.parse(localStorage.product);
} else {
  arrProducts = [];
}

submit.onclick = function create() {
  let product = {
    titleInfo: title.value,
    priceInfo: price.value,
    taxesInfo: taxes.value,
    adsInfo: ads.value,
    discountInfo: discount.value,
    totalInfo: total.innerHTML,
    categoryInfo: category.value,
    countInfo: count.value,
  };

  if (mode == "create") {
    if (product.countInfo >= 1) {
      for (let index = 0; index < product.countInfo; index++) {
        arrProducts.push({ ...product });
      }
    }
  } else {
    arrProducts[tempIndex] = product;
    count.style.display = "block";
    submit.textContent = "create";
    mode = "create";
  }
  localStorage.setItem("product", JSON.stringify(arrProducts));
  clear();
  showData();
  getTotal();
};
function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
function showData() {
  let table = "";
  for (let index = 0; index < arrProducts.length; index++) {
    table += `
             <tr>
                <td>${index + 1}</td>
                <td>${arrProducts[index].titleInfo || "empty"}</td>
                <td>${arrProducts[index].priceInfo || "empty"}</td>
                <td>${arrProducts[index].taxesInfo || "empty"}</td>
                <td>${arrProducts[index].adsInfo || "empty"}</td>
                <td>${arrProducts[index].discountInfo || "empty"}</td>
                <td>${arrProducts[index].totalInfo || "empty"}</td>
                <td >${arrProducts[index].categoryInfo || "empty"}</td>
                <td><button class="update-btn" data-index="${index}">update</button></td>
                <td><button class="delete-btn" data-index="${index}">delete</button></td>
              </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.querySelector(".deletAll");
  if (arrProducts.length > 0) {
    btnDelete.innerHTML = `
<button id="delete" onclick="deleteAll()">Delete All</button>
`;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

document.getElementById("tbody").addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("delete-btn")) {
    let i = Number(e.target.dataset.index);
    deleteProduct(i);
  }
  if (e.target && e.target.classList.contains("update-btn")) {
    let i = Number(e.target.dataset.index);
    updateProduct(i);
  }
});
function deleteProduct(i) {
  let body = document.querySelectorAll("#tbody tr");
  body.forEach((e, index) => {
    if (index == i) {
      arrProducts.splice(i, 1);
    }
  });
  localStorage.product = JSON.stringify(arrProducts);
  showData();
}

function updateProduct(i) {
  title.value = arrProducts[i].titleInfo;
  price.value = arrProducts[i].priceInfo;
  taxes.value = arrProducts[i].taxesInfo;
  ads.value = arrProducts[i].adsInfo;
  discount.value = arrProducts[i].discountInfo;
  category.value = arrProducts[i].categoryInfo;
  localStorage.product = JSON.stringify(arrProducts);
  count.style.display = "none";
  submit.textContent = "update";
  mode = "update";
  tempIndex = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  getTotal();
  showData();
}
function deleteAll() {
  localStorage.clear();
  arrProducts.splice(0);
  showData();
}

let searchMod = "title";
function searcH(id) {
  if (id == "searchCategory") {
    search.value = "";
    search.placeholder = "search by category";
    searchMod = "category";
  } else {
    search.value = "";
    search.placeholder = "search by title";
    searchMod = "title";
  }
  search.focus();
}

function searchEngine(value) {
  let table = "";
  for (let index = 0; index < arrProducts.length; index++) {
    if (searchMod == "title") {
      if (arrProducts[index].titleInfo.includes(value)) {
        table += `
             <tr>
                <td>${index + 1}</td>
                <td>${arrProducts[index].titleInfo || "empty"}</td>
                <td>${arrProducts[index].priceInfo || "empty"}</td>
                <td>${arrProducts[index].taxesInfo || "empty"}</td>
                <td>${arrProducts[index].adsInfo || "empty"}</td>
                <td>${arrProducts[index].discountInfo || "empty"}</td>
                <td>${arrProducts[index].totalInfo || "empty"}</td>
                <td >${arrProducts[index].categoryInfo || "empty"}</td>
                <td><button class="update-btn" data-index="${index}">update</button></td>
                <td><button class="delete-btn" data-index="${index}">delete</button></td>
              </tr>

    `;
      }
    } else {
      if (arrProducts[index].categoryInfo.includes(value)) {
        table += `
             <tr>
                <td>${index + 1}</td>
                <td>${arrProducts[index].titleInfo || "empty"}</td>
                <td>${arrProducts[index].priceInfo || "empty"}</td>
                <td>${arrProducts[index].taxesInfo || "empty"}</td>
                <td>${arrProducts[index].adsInfo || "empty"}</td>
                <td>${arrProducts[index].discountInfo || "empty"}</td>
                <td>${arrProducts[index].totalInfo || "empty"}</td>
                <td >${arrProducts[index].categoryInfo || "empty"}</td>
                <td><button class="update-btn" data-index="${index}">update</button></td>
                <td><button class="delete-btn" data-index="${index}">delete</button></td>
              </tr>

    `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

document.querySelector("body").addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("searchCategory") &&
    !e.target.classList.contains("searchTite")
  ) {
    search.placeholder = "search";
  }
});
