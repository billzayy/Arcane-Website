import * as alias from './func.mjs'
import { sideBarBtn } from './user-side-btn.js';

const container = document.querySelector('tbody');
const adminSection = document.querySelector('.content .admin-container');
const fillSection = document.querySelector('.fill-section');

const addBtn = document.querySelector('.add-btn');
const addFillBtn = document.querySelector('.add-fill-btn')

window.addEventListener("DOMContentLoaded", () => {
    alias.setUser();
    alias.logoutAct();
    alias.scrollPage();
    alias.moveCart();
    alias.countCart();
    alias.moveContact();
    alias.moveProfile();

    sideBarBtn();
    showProduct();
    addClick();
})

async function showProduct() {
    var result = "";
    const res = await fetch(`http://localhost:3000/api/product`);
    const data = await res.json();
    data.forEach(product => {
        result += `
            <tr>
                <td>${product.Id_Product}</td>
                <td style = "width: 45%;">
                    <img src=".${product.P_Picture}" alt="">
                </td>
                <td>${product.P_Name}</td>
                <td>${product.P_Price}</td>
                <td>
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            </tr>
        `
        container.innerHTML = result;
    })
}
function addClick() {
    addBtn.addEventListener('click', () => {
        adminSection.classList.toggle('close');
        fillSection.classList.toggle('active');
    })

    addFillBtn.addEventListener('click', () => {
        adminSection.classList.toggle('close');
        fillSection.classList.toggle('active');
    })
}