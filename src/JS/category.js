import * as alias from './func.mjs'

const iconBtn = document.querySelectorAll('.btn-icon')
const contentGrid = document.querySelector('.content-1');
const contentList = document.querySelector('.content-2');
window.addEventListener("DOMContentLoaded", () => {
    alias.setUser();
    alias.logoutAct();
    alias.scrollPage();
    alias.moveCart()
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
    addCart(idProduct)
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

function addCart(id) {
    const cartBtn = document.querySelectorAll('.info-btn')
    for (let i = 0; i < cartBtn.length; i++){
        cartBtn[i].addEventListener('click', async () => {
            try {
                let idClient = parseInt(sessionStorage.getItem('idClient'))
                let idNum = parseInt(id[i].textContent)
                await fetch(`http://localhost:3000/api/shoppingcart/add/${idClient}/${idNum}`)
                alert("Add to cart Successful !")
            }
            catch {
                alert("Error Add to ShoppingCart!")
                window.location.reload()
            }
        })
    }
}
