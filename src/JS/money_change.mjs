import * as check from './checkout.mjs'

function btnPrice(section, idProduct) {
    const btnPlus = document.querySelectorAll('.price-btn .fa-plus');
    const btnMinus = document.querySelectorAll('.price-btn .fa-minus');
    const numBox = document.querySelectorAll('#counter')
    const price = document.querySelectorAll('.cart-price span');
    const size = document.querySelectorAll('.size-content')
    
    let sum = [];
    let result = 0;
    for (let i = 0; i < section.length; i++) {
        sum[i] = parseInt(price[i].textContent)
        btnPlus[i].addEventListener('click', () => {
            numBox[i].value++;
            sum[i] = definePrice(i, price, numBox)
            dbQuantity(parseInt(idProduct[i].textContent), numBox[i].value,size[i].textContent)
            countSection("add", sum);
        })

        btnMinus[i].addEventListener('click', () => {
            if (numBox[i].value != 1) {
                numBox[i].value--;
                sum[i] = definePrice(i, price, numBox)
                dbQuantity(parseInt(idProduct[i].textContent), numBox[i].value,size[i].textContent)
                countSection("minus",sum)
            }
            else {
                numBox[i].value = 1;
            }
        })
    }
    // priceBox.innerHTML = `$${addPrice(sum)}`
    countSection("add",sum)
}

function definePrice(i, price, numBox) {
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

function countSection(operator,arr) {
    const orderItem = document.querySelector('.order-items span');
    const counterItems = document.querySelectorAll('.price-btn #counter');
    const btnCart = document.querySelector('.btn-cart span');
    const priceBox = document.querySelector('.order-total span')

    let sum = 0;
    let price = 0;
    if (operator == 'minus') {
        counterItems.forEach(item => {
            sum -= parseInt(item.value)
            price = Math.abs(minusPrice(arr))
        })
    }
    else {
        counterItems.forEach(item => {
            sum += parseInt(item.value)
            price = addPrice(arr)
        })
    }
    orderItem.innerHTML = Math.abs(sum)
    btnCart.innerHTML = `(${Math.abs(sum)})`;
    priceBox.innerHTML = `$${price}` 
}

async function dbQuantity(idProduct, quantity, size) {
    let idClient = parseInt(sessionStorage.getItem('idClient'))
    const res = await fetch(`http://localhost:3000/api/shoppingcart/update/quantity/${idClient}/${idProduct}/${quantity}/${size}`)
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
export {
    btnPrice,
    inputValueChange
}