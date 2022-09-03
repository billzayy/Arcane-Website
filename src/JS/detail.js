import * as funcs from './func.mjs'

const contentMain = document.querySelector('#main');
const optBtn = document.querySelectorAll('.opt-title ul li')

window.addEventListener("DOMContentLoaded", () => {
    funcs.setUser();
    funcs.logoutAct();
    funcs.scrollPage();
    funcs.moveCart();
    funcs.countCart();
    funcs.moveContact();
    
    Detail();
    optContent();
})

async function Detail() {
    let result = "";
    const url = sessionStorage.getItem('api');
    const res = await fetch(url);
    const data = res.json();
    data.then((data) => {
        data.forEach((item) => {
            result += `
            <div class="id-product">${item.Id_Product}</div>
            <div class="main-pic">
                <img src=".${item.P_Picture}" alt="">
            </div>
            <div class="main-content">
                <div class="main-name">${item.P_Name}</div>
                <div class="main-category">
                    ${item.P_Category} for 
                    <span class="content-gender">${item.P_Gender}</span>
                </div>
                <div class="content-description">
                    Description : 
                    <span>${item.P_Describe}</span>
                </div>
                <div class="content-material">Material : 
                    <span>${item.P_Material}</span>
                </div>
                <div class="content-manufacture">Manufacture : 
                    <span>${item.P_Manufacture}</span>
                </div>
                <div class="content-color">Color : 
                    <span>${item.P_Color}</span>
                </div>
                <div class="content-size">Size : <span>L</span></div>
                <div class="btn-size">
                    <input type="button" name = "btnSize" value="XXS">
                    <input type="button" name = "btnSize" value="XS">
                    <input type="button" name = "btnSize" value="S">
                    <input type="button" name = "btnSize" value="M">
                    <input type="button" name = "btnSize" value="L">
                    <input type="button" name = "btnSize" value="XL">
                    <input type="button" name = "btnSize" value="XXL">
                    <input type="button" name = "btnSize" value="XXXL">
                </div>
                <div class="price-btn">
                    <i class="fas fa-minus"></i>
                    <input type="text" name="counter" id="counter" value="1">
                    <i class="fas fa-plus"></i>
                    <div class="price-content">$${item.P_Price}</div>
                </div>
                <div class="add-cart">
                    <input type="button" value="Add to cart">
                </div>
            </div>
            `;
            contentMain.innerHTML = result;
            btnPrice(item.P_Price);
            btnSize();
            cartFeature(item.Id_Product);
        })
    })
}

function btnSize() {
    const sizeBtn = document.querySelectorAll('.btn-size input');
    const sizeBox = document.querySelector('.content-size span');
    sizeBtn.forEach(i => {
        i.addEventListener('click', () => {
            sizeBox.innerHTML = i.value;
        })
    })
}

function btnPrice(price) {
    const btnPlus = document.querySelector('.price-btn .fa-plus');
    const btnMinus = document.querySelector('.price-btn .fa-minus');
    const numBox = document.querySelector('#counter')
    const priceBox = document.querySelector('.price-content')

    btnPlus.addEventListener('click', () => {
        numBox.value++;
        priceBox.innerHTML = `$${price * numBox.value}`
    })

    btnMinus.addEventListener('click', () => {
        if (numBox.value != 1) {
            numBox.value--;
            priceBox.innerHTML = `$${price * numBox.value}`
        }
        else {
            numBox.value = 1;
        }
    })
}


function optContent() {
    const describe = document.querySelector('.describe-content')
    const sizeGuide = document.querySelector('.size-guide-content')
    const usageTip = document.querySelector('.usage-tip-content')
    optBtn.forEach(i => {
        i.addEventListener('click', (e) => {
            console.log(e.target)
            if (i.innerHTML == 'Usage Tips') {
                describe.style.display = 'none';
                sizeGuide.style.display = 'none';
                usageTip.style.display = 'flex';
            }
            else if (i.innerHTML == 'Size Guide') {
                describe.style.display = 'none';
                sizeGuide.style.display = 'flex';
                usageTip.style.display = 'none';
            }
            else {
                describe.style.display = 'flex';
                sizeGuide.style.display = 'none';
                usageTip.style.display = 'none';
            }
        })
    })
}

function cartFeature(id) {
    const cartBtn = document.querySelector('.add-cart input')
    const sizeBox = document.querySelector('.content-size span')
    const quantityBox = document.querySelector('.price-btn #counter')

    let idClient = parseInt(sessionStorage.getItem('idClient'))
    let cartArr = [];
    cartBtn.addEventListener('click', async () => {
        if (Number.isNaN(idClient)) {
            alert("Welcome Guest ! Please sign up or log in to buy our products !")
            console.log("Nothing")
        }
        else {
            const res = await fetch(`http://localhost:3000/api/shoppingcart/${idClient}`)
            const data = await res.json()
            data.forEach((item) => {
                cartArr.push(item.Id_Product)
            })
            if (cartArr.includes(id) == false) {
                addToCart(idClient, id, quantityBox.value, sizeBox.textContent)
            }
            else {
                updateCart(idClient, id, quantityBox.value, sizeBox.textContent)
            }
        }
    })
}

async function addToCart(idClient, idProduct, quantity,size) {
    await fetch(`http://localhost:3000/api/shoppingcart/add/${idClient}/${idProduct}/${quantity}/${size}`)
    alert("Add to cart Successful !")
    window.location.reload();
}

async function updateCart(idClient, idProduct, counter,size) {
    const result = await fetch(`http://localhost:3000/api/shoppingcart/update/quantity/${idClient}/${idProduct}/${counter}/${size}`)
    const dataset = await result.json()
    console.log(dataset)
    window.location.reload();
}