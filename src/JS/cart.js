import * as alias from './func.mjs'

const goBack = document.querySelector('.go-back');
const sectionShow = document.querySelector('.cart-left')

window.addEventListener("DOMContentLoaded", () => {
    alias.setUser();
    alias.logoutAct();
    alias.scrollPage();
    alias.moveCart();
    showCart()
})

goBack.addEventListener('click', () => {
    window.location.href = "http://localhost:3000/category"
})

function btnPrice(section) {
    const btnPlus = document.querySelectorAll('.price-btn .fa-plus');
    const btnMinus = document.querySelectorAll('.price-btn .fa-minus');
    const numBox = document.querySelectorAll('#counter')
    const price = document.querySelectorAll('.cart-price span');
    const priceBox = document.querySelector('.order-total span')

    let sum = []; 
    for (let i = 0; i < section.length; i++) {
        sum[i] = parseInt(price[i].textContent)
        btnPlus[i].addEventListener('click', () => {
            numBox[i].value++;
            sum[i] = definePrice(i,price, numBox)
            priceBox.innerHTML = `$${addPrice(sum)}`
        })

        btnMinus[i].addEventListener('click', () => {
            if (numBox[i].value != 1) {
                numBox[i].value--;
                sum[i] = definePrice(i, price, numBox)
                priceBox.innerHTML = `$${Math.abs(minusPrice(sum))}`
            }
            else {
                numBox[i].value = 1;
            }
        })
    }
    priceBox.innerHTML = `$${addPrice(sum)}`
}

function definePrice(i,price,numBox) {
    let result = parseInt(price[i].textContent) * parseInt(numBox[i].value);
    return result
}

function addPrice(arr) {
    let result = 0
    arr.forEach(i => {
        result = result + i
    })
    return result
}

function minusPrice(arr) {
    let result = 0
    arr.forEach(i => {
        result = result - i
    })
    return result
}

async function showCart() {
    let result = "";
    const url = sessionStorage.getItem('idClient')
    const res = await fetch(`/api/shoppingcart/${url}`)
    const data = await res.json();
    data.forEach(item => {
        result += `
                <section>
                    <img src="${item.P_Picture}" alt="">
                    <div class="cart-product">
                        <div class="cart-product-title">
                            <div class="cart-name">${item.P_Name}</div>
                            <div class="cart-sub">
                                <div class="cart-describe">
                                    <span class="cart-category">${item.P_Category}</span> for <span class="cart-gender">${item.P_Gender}</span>
                                </div>
                                <div class="cart-size">
                                    <p>Size :</p> <span class="size-content">${item.P_Size}</span>
                                </div>
                            </div>
                        </div>
                        <div class="cart-product-price">
                            <div class="price-btn">
                                <i class="fas fa-minus"></i>
                                <input type="text" name="counter" id="counter" value="1">
                                <i class="fas fa-plus"></i>
                            </div>
                            <div class="price-content">
                                <div class="cart-sale">Sale</div>
                                <div class="cart-price">$<span>${item.P_Price}</span> </div>
                            </div>
                            <div class="btn-delete">
                                <i class="fas fa-times"></i>
                            </div>
                        </div>
                    </div>
                </section>  
            `
        sectionShow.innerHTML = result
    })
    const section = document.querySelectorAll('section')

    countSection(section)
    btnPrice(section)
}

function takeURL(url) {
    const s = url.split(',')
    return s
}

function countSection(section) {
    const orderItem = document.querySelector('.order-items span');

    orderItem.innerHTML = section.length
}
