import * as alias from './func.mjs'

const iconBtn = document.querySelectorAll('.btn-icon')
const contentGrid = document.querySelector('.content-1');
const contentList = document.querySelector('.content-2');
window.addEventListener("DOMContentLoaded", () => {
    alias.setUser();
    alias.logoutAct();
    alias.scrollPage();
    alias.moveCart();
    alias.countCart();
    alias.moveContact();

    iconClick();
    showProduct();
    showProduct2();
})

async function showProduct() {
    let result = "";
    const res = await fetch("http://localhost:3000/api/product");
    const data = await res.json();
    data.forEach(i => {
        result += `
            <section>
                <div class ="id_product">${i.Id_Product}</div>
                <div class="content-pic">
                    <div class="special">${i.P_Sales}</div>
                    <img src="${i.P_Picture}" alt="">
                    <div class="price">$${i.P_Price}</div>
                </div>
                <div class="content-text">
                    <div class="content-description">
                        ${i.P_Category} for ${i.P_Gender}
                    </div>
                    <div class="content-name">${i.P_Name}</div>
                </div>
            </section>
        `
        contentGrid.innerHTML = result
    })
    const price = document.querySelectorAll('.price');
    const sale = document.querySelectorAll('.special');
    const idProduct = document.querySelectorAll('.id_product');
    const gridBtn = document.querySelectorAll('.content-1 section');
    for (let i = 0; i < price.length; i++) {
        alias.changeColorSale(sale[i], price[i]);
    }
    detailProduct(idProduct, gridBtn);
}

async function showProduct2() {
    let result = "";
    const res = await fetch("http://localhost:3000/api/product");
    const data = await res.json();
    data.forEach(i => {
        result += `
            <section>
                <div class ="id-product-2">${i.Id_Product}</div>  
                <div class="list-pic">
                    <img src="${i.P_Picture}" alt="">
                    <div class="list-price">$${i.P_Price}</div>
                </div>
                <div class="list-content">
                    <div class="list-content-name">${i.P_Name}</div>
                    <div class="list-content-title">
                        ${i.P_Category} for ${i.P_Gender}
                    </div>
                    <div class="list-content-text">
                        <ul>
                            <li>${i.Content_1}</li>
                            <li>${i.Content_2}</li>
                        </ul>
                    </div>
                </div>
                <div class="list-info">
                    <div class="info-title">Information</div>
                    <div class="list-info-description">
                        Description : <span>${i.P_Describe}</span>
                    </div>
                    <div class="list-info-material">
                        Material : <span>${i.P_Material}</span>
                    </div>
                    <div class="list-info-color">
                        Color : <span>${i.P_Color}</span>
                    </div>
                    <button class="info-btn">Add to cart</button>
                </div>
                <div class="sale">${i.P_Sales}</div>
            </section>
        `
        contentList.innerHTML = result
    })
    const price = document.querySelectorAll('.list-price');
    const sale = document.querySelectorAll('.sale');
    const idProduct = document.querySelectorAll('.id-product-2');
    const listBtn = document.querySelectorAll('.content-2 section img');
    for (let i = 0; i < price.length; i++) {
        alias.changeColorSale(sale[i], price[i]);
    }
    detailProduct(idProduct, listBtn)
    cartFeature(idProduct)
}

function iconClick() {
    iconBtn[0].addEventListener('click', () => {
        contentGrid.style.display = 'flex';
        contentList.style.display = 'none';
        iconBtn[0].style.opacity = 1;
        iconBtn[1].style.opacity = 0.5;
    })

    iconBtn[1].addEventListener('click', () => {
        contentGrid.style.display = 'none';
        contentList.style.display = 'flex';
        iconBtn[0].style.opacity = 0.5;
        iconBtn[1].style.opacity = 1;
    })
}

function detailProduct(id, styleBtn) {
    for (let i = 0; i < styleBtn.length; i++) {
        styleBtn[i].addEventListener('click', () => {
            sessionStorage.setItem('api', `http://localhost:3000/api/detail/${id[i].textContent}`)
            location.href = `http://localhost:3000/detail/`
        })
    }
}

function cartFeature(id) {
    const cartBtn = document.querySelectorAll('.info-btn')
    let arrCheck = [];
    for (let i = 0; i < cartBtn.length; i++){
        cartBtn[i].addEventListener('click', async () => {
            try {
                let idClient = parseInt(sessionStorage.getItem('idClient'))
                let idProduct = parseInt(id[i].textContent)

                const res = await fetch(`http://localhost:3000/api/shoppingcart/${idClient}`)
                const data = await res.json()
                data.forEach(i => {
                    arrCheck.push(i.Id_Product)
                })

                let counter = countArr(arrCheck, idProduct)

                if (counter == 0) {
                    addToCart(idClient, idProduct);
                }
                else if(counter >=1){
                    updateCart(idClient, idProduct, counter)
                }
            }
            catch {
                alert("Error Add to ShoppingCart!")
                window.location.reload()
            }
        })
    }
}

function sortArr(arr) {
    let temp = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[i]) {
                temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp
            }
        }
    }
    return arr
}

function countArr(arr, idProduct) {
    let sum = 0;
    const sorted = sortArr(arr)
    for (let i = 0; i < sorted.length; i++) {
        if (sorted[i] == idProduct) {
            sum++;
        }
        else if (sorted[i] == sorted[sorted.length - 1]) {
            break;
        }
    }
    return sum
}

async function addToCart(idClient, idProduct) {
    await fetch(`http://localhost:3000/api/shoppingcart/add/${idClient}/${idProduct}/${1}/${null}`)
    alert("Add to cart Successful !")
}

async function updateCart(idClient, idProduct, counter) {
    const result = await fetch(`http://localhost:3000/api/shoppingcart/update/quantity/${idClient}/${idProduct}/${counter}/${null}`)
    const dataset = await result.json()
    console.log(dataset)
}