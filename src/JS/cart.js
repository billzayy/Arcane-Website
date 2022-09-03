import * as alias from './func.mjs'
import * as check from './checkout.mjs'
import { btnPrice, inputValueChange } from './money_change.mjs';

const goBack = document.querySelector('.go-back');
const sectionShow = document.querySelector('.cart-left')

window.addEventListener("DOMContentLoaded", () => {
    alias.setUser();
    alias.logoutAct();
    alias.scrollPage();
    alias.moveCart();
    alias.countCart();
    alias.moveContact();
    alias.moveProfile();

    cart()
})

goBack.addEventListener('click', () => {
    window.location.href = "http://localhost:3000/category"
})

async function cart() {
    const nothingText = document.querySelector('.none-section')
    const cartSummary = document.querySelector('.cart-summary')
    const url = sessionStorage.getItem('idClient')
    const res = await fetch(`/api/shoppingcart/${url}`)
    const data = await res.json();
    if (data.length == 0) {
        nothingText.style.display = "flex"
        cartSummary.style.display = "none"
    }
    else {
        nothingText.style.display = "none"
        cartSummary.style.display = "block"
        showCart()
    }
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
                        <div class="id-product">${item.Id_Product}</div>
                        <div class="cart-product-title">
                            <div class="cart-name">${item.P_Name}</div>
                            <div class="cart-sub">
                                <div class="cart-describe">
                                    <span class="cart-category">${item.P_Category}</span> for <span class="cart-gender">${item.P_Gender}</span>
                                </div>
                                <div class="cart-size">
                                    <p>Size :</p> <span class="size-content">${item.Size}</span>
                                </div>
                            </div>
                        </div>
                        <div class="cart-product-price">
                            <div class="price-btn">
                                <i class="fas fa-minus"></i>
                                <input type="text" name="counter" id="counter" value="${inputValueChange(item.Quantity)}">
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
    const idProduct = document.querySelectorAll('.id-product')
    btnPrice(section, idProduct)
    detailCart(idProduct)
    deleteFunc(idProduct, section)
}

function detailCart(id) {
    const imgBtn = document.querySelectorAll('section img');
    for(let i = 0; i < imgBtn.length; i++) {
        imgBtn[i].addEventListener('click', () => {
            sessionStorage.setItem('api', `http://localhost:3000/api/detail/${id[i].textContent}`)
            location.href = `http://localhost:3000/detail/`
        })
    }
}

function deleteFunc(id, section) {
    const removeBtn = document.querySelectorAll('.btn-delete')
    let idClient = parseInt(sessionStorage.getItem('idClient'))

    for (let i = 0; i < removeBtn.length; i++) {
        removeBtn[i].addEventListener('click', () => {
            section[i].remove()
            deleteCart(idClient, parseInt(id[i].textContent))
            location.reload()
        })
    }
}

async function deleteCart(idClient, idProduct) {
    const result = await fetch(`http://localhost:3000/api/shoppingcart/remove/${idProduct}/${idClient}/`)
    const dataset = await result.json()
    console.log(dataset)
}