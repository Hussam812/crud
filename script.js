"use strict";

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");


let mood ="create";
let temp;
//GET TOTAL

const getTotal = () =>{
    if (price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    }else {
        total.innerHTML = "";
        total.style.background = "#a00d02";

    }
}




let dataPro = [];
if (localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}
//CREATE PRODUCT

submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count:count.value,
        category: category.value.toLowerCase(),

    }
    //COUNT
    if(title.value != ""
    && category.value != "" 
    && price.value != ""
    && newPro.category < 100){
        if (mood ==="create"){
            if (newPro.count > 1){
                for (let i =0; i < newPro.count; i++){
                    dataPro.push(newPro);
                }
            }else {
                dataPro.push(newPro);
        
            }
        }else{
            dataPro[temp] = newPro;
            mood = "create";
            submit.innerHTML = "create";
            count.style.display = "block";
        }
        clearDate();

    }else {
    }
    
    //SAVE LOCAL STORAGE
    localStorage.setItem("product", JSON.stringify(dataPro));

    showData();
}



//CLEAR INPUTS
const clearDate = () => {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML ="";
    count.value = "";
    category.value = "";
}
//READ
const showData = () =>{
    getTotal();
    let table = "";
    for (let i =0; i<dataPro.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick= "updateData(${i})" class="update">update</button></td>
            <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
        </tr>
        `
    
    }
    document.getElementById("tbody").innerHTML = table;

    let btnDelete = document.getElementById("deleteAll");

    if (dataPro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()" >delete all (${dataPro.length})</button>`;
    }else {
        btnDelete.innerHTML = "";
    }
}

showData();

//DELETE
const deleteData = (i) => {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();

}

const deleteAll = () => {
    dataPro= [];
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
//UPDATE
function updateData(i){
    mood = "update";
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = "none";
    submit.innerHTML = "update";
    temp = i;
    scroll({
        top:0, behavior: "smooth"
    })
}

//SEARCH

let searchMood ="Title";
function getSearchMood(id){

    let search = document.getElementById("search");
    if (id  == "searchTitle"){
        searchMood = "Title";

    }else{
        searchMood = "Category";

    }
    search.placeholder = `Search By  ${searchMood}`;

    search.focus();
    search.value = "";
    showData();
}
function searchData(value) {
    let table ="";
        for (let i = 0; i <dataPro.length; i++){

            if (searchMood == "Title"){
                if (dataPro[i].title.includes(value.toLowerCase())){
                    table  += 
                    `<tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick= "updateData(${i})" class="update">update</button></td>
                        <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
                    </tr>`
                } 
            }else{
                    if (dataPro[i].category.includes(value.toLowerCase())){
                        table  += 
                        `<tr>
                            <td>${i+1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick= "updateData(${i})" class="update">update</button></td>
                            <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
                        </tr>`
                    }
                }
                document.getElementById("tbody").innerHTML = table;
            }
        }
//CLEAN DATAads

