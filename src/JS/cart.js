import * as alias from './func.mjs'

const goBack = document.querySelector('.go-back');
const sectionShow = document.querySelector('.cart-left')

window.addEventListener("DOMContentLoaded", () => {
    alias.setUser();
    alias.logoutAct();
    alias.scrollPage();
    alias.moveCart();
    alias.countCart();

    showCart()
})

goBack.addEventListener('click', () => {
    window.location.href = "http://localhost:3000/category"
})

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
    countSection()
    btnPrice(section, idProduct)
    detailCart(idProduct)
    deleteFunc(idProduct, section)
}

function btnPrice(section,idProduct) {
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
            dbQuantity(parseInt(idProduct[i].textContent),numBox[i].value)
            countSection("add")
        })

        btnMinus[i].addEventListener('click', () => {
            if (numBox[i].value != 1) {
                numBox[i].value--;
                sum[i] = definePrice(i, price, numBox)
                priceBox.innerHTML = `$${Math.abs(minusPrice(sum))}`
                dbQuantity(parseInt(idProduct[i].textContent), numBox[i].value)
                countSection("minus")
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

function countSection(operator) {
    const orderItem = document.querySelector('.order-items span');
    const counterItems = document.querySelectorAll('.price-btn #counter');
    const btnCart = document.querySelector('.btn-cart span')
    let sum = 0;

    if (operator == 'minus') {
        counterItems.forEach(item => {
            sum -= parseInt(item.value)
        })
        // sessionStorage.setItem('countProduct',Math.abs(sum))
    }
    else {
        counterItems.forEach(item => {
            sum += parseInt(item.value)
        })
        // sessionStorage.setItem('countProduct',Math.abs(sum))
    }
    orderItem.innerHTML = Math.abs(sum)
    btnCart.innerHTML = `(${Math.abs(sum)})`
}

async function dbQuantity(idProduct, quantity) {
    let idClient = parseInt(sessionStorage.getItem('idClient'))
    const res = await fetch(`http://localhost:3000/api/shoppingcart/update/quantity/${idClient}/${idProduct}/${quantity}/${null}`)
    const data = await res.json();
    console.log(data)
}

function inputValueChange(quantity) {
    if (quantity == null) {
        return 1
    }
    else {
        return quantity
    }
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
        })
    }
}

async function deleteCart(idClient, idProduct) {
    const result = await fetch(`http://localhost:3000/api/shoppingcart/remove/${idProduct}/${idClient}/`)
    const dataset = await result.json()
    console.log(dataset)
}