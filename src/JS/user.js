import * as alias from './func.mjs'

const listPerson = document.querySelector('.personal-btn');
const listAdmin = document.querySelector('.admin-btn');

// Button
const personBtn = document.querySelector('.title-personal');
const adminBtn = document.querySelector('.title-admin');

window.addEventListener("DOMContentLoaded", () => {
    alias.setUser();
    alias.logoutAct();
    alias.scrollPage();
    alias.moveCart();
    alias.countCart();
    alias.moveContact();
})

personBtn.addEventListener("click", () => {
    listPerson.classList.toggle('close')
})

adminBtn.addEventListener("click", () => {
    listAdmin.classList.toggle('close')
})