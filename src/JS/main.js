import * as funcs from './func.mjs'

const clothes = document.querySelector('#clothes');
const deco = document.querySelector('#deco');
const other = document.querySelector('#other');
const goCategory = document.querySelectorAll('.btn');

goCategory.forEach(i => { 
    i.addEventListener('click', () => {
        window.location.href = "http://localhost:3000/category"
    })
})

window.addEventListener("DOMContentLoaded", () => { 
    funcs.setUser();
    funcs.logoutAct();
    funcs.scrollPage();
    funcs.moveCart();
    funcs.countCart()
    funcs.moveContact()

    mainClothes();
    mainDeco();
    mainOther();
})

function mainClothes() { 
    fetch("http://localhost:3000/api/product")
        .then(res => res.json())
        .then(data => {
            let mainPage = "";
            data.forEach(i => {
                if (i.P_Page == 'Main' && i.P_Category != 'Poster' && i.P_Category != 'Other') {
                    mainPage += `
                    <section>
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
                }        
            })
            return mainPage;
        })
        .then(result => {
            clothes.innerHTML = result
        })
        .then(() => {
            const price = document.querySelectorAll('.price');
            const sale = document.querySelectorAll('.special');
            for (let i = 0; i < price.length; i++) { 
                funcs.changeColorSale(sale[i],price[i]);
            }
        }).then(() => {
            const sectionBtn = document.querySelectorAll('section');

            sectionBtn.forEach(i => {
                i.addEventListener('click',() => {
                    window.location.href = "http://localhost:3000/category"
                })
            })
        })
}

function mainDeco() {
    fetch("http://localhost:3000/api/product")
        .then(res => res.json())
        .then(data => {
            let mainPage = "";
            data.forEach(i => {
                if (i.P_Page == 'Main' && i.P_Category == 'Poster') {
                    mainPage += `
                    <section>
                        <div class="content-pic">
                            <div class="special">${i.P_Sales}</div>
                            <img src="${i.P_Picture}" alt="">
                            <div class="deco-price">$${i.P_Price}</div>
                        </div>
                        <div class="content-text">
                            <div class="content-description">${i.P_Category} for ${i.P_Size}</div>
                            <div class="content-name">${i.P_Name}</div>
                        </div>
                    </section>
                        `
                }
            })
            return mainPage;
        })
        .then(result => {
            deco.innerHTML = result
        })
        .then(() => {
        const sectionBtn = document.querySelectorAll('section');

        sectionBtn.forEach(i => {
            i.addEventListener('click',() => {
                window.location.href = "http://localhost:3000/category"
            })
        })
    })
}

function mainOther() {
    fetch("http://localhost:3000/api/product")
        .then(res => res.json())
        .then(data => {
            let mainPage = "";
            data.forEach(i => {
                if (i.P_Page == 'Main' && i.P_Category == 'Other') {
                    mainPage += `
                    <section>
                        <div class="content-pic">
                            <div class="special">${i.P_Sales}</div>
                            <img src="${i.P_Picture}" alt="">
                            <div class="price">$${i.P_Price}</div>
                        </div>
                        <div class="content-text">
                            <div class="content-description">${i.P_Describe}</div>
                            <div class="content-name">${i.P_Name}</div>
                        </div>
                    </section>
                        `
                }
            })
            return mainPage;
        })
        .then(result => {
            other.innerHTML = result
        })
        .then(() => {
            const price = document.querySelectorAll('#other .price');
            const sale = document.querySelectorAll('#other .special');
            for (let i = 0; i < price.length; i++) {
                funcs.changeColorSale(sale[i], price[i]);
            }
        }).then(() => {
            const sectionBtn = document.querySelectorAll('section');

            sectionBtn.forEach(i => {
                i.addEventListener('click',() => {
                    window.location.href = "http://localhost:3000/category"
                })
            })
        })
}