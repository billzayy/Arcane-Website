import * as alias from './func.mjs'
import { sideBarBtn } from './user-side-btn.js';
const listPerson = document.querySelector('.personal-btn');
const listAdmin = document.querySelector('.admin-btn');
const arrow = document.querySelectorAll('.arrow .fa-caret-up');

// Button
const personBtn = document.querySelector('.title-personal');
const adminBtn = document.querySelector('.title-admin');
const logoutBtn = document.querySelector('.logout-section')

window.addEventListener("DOMContentLoaded", () => {
    alias.setUser();
    alias.logoutAct();
    alias.scrollPage();
    alias.moveCart();
    alias.countCart();
    alias.moveContact();
    sideBarBtn();
})

personBtn.addEventListener("click", () => {
    listPerson.classList.toggle('close')
    arrow[0].classList.toggle('rotate-btn')
})

adminBtn.addEventListener("click", () => {
    listAdmin.classList.toggle('close')
    arrow[1].classList.toggle('rotate-btn')
})

logoutBtn.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "http://localhost:3000/login"
})