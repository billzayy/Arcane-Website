import * as alias from './func.mjs'
import { sideBarBtn } from './user-side-btn.js';

const deleteBtn = document.querySelector('.delete-btn');

window.addEventListener("DOMContentLoaded", () => {
    alias.setUser();
    alias.logoutAct();
    alias.scrollPage();
    alias.moveCart();
    alias.countCart();
    alias.moveContact();
    alias.moveProfile();

    sideBarBtn();
})

deleteBtn.addEventListener("click", async () => {
    await deleteProfileApi();
})

async function deleteProfileApi() {
    const idClient = sessionStorage.getItem('idClient');
    await alert("Delete Successful!");
}