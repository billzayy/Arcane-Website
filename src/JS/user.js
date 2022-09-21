import * as alias from './func.mjs'
import { sideBarBtn } from './user-side-btn.js';

const editBtn = document.querySelectorAll('.edit-btn');
const infoContent = document.querySelectorAll('.info-text input');
const saveBtn = document.querySelectorAll('.save-btn');
const infoPara = document.querySelectorAll('.info-text p');
const deleteBtn = document.querySelectorAll('.info-delete-btn');

window.addEventListener("DOMContentLoaded", () => {
    alias.setUser();
    alias.logoutAct();
    alias.scrollPage();
    alias.moveCart();
    alias.countCart();
    alias.moveContact();
    sideBarBtn();
    profileSection()
})

function checkImg(username, picture) {
    const checkImgBox = document.querySelector('.user .pic img');
    const addImgBox = document.querySelector('.user .pic input');
    const picBtn = document.querySelector('.user .pic .side-btn');

    if (username == sessionStorage.getItem('user')) {
        switch (picture) {
            case null:
                checkImgBox.outerHTML = `${'<img src="../img/User/User-none.jpeg"></img>'}`
                picBtn.style.display = 'none'
                break;
            default:
                checkImgBox.outerHTML = `<img src="${picture}"></img>`;
                addImgBox.style.display = 'none';
                break;
        }
    }
}

async function profileSection() {
    const result = await fetch(`http://localhost:3000/api/user`);
    const data = await result.json();
    data.forEach(i => {
        checkImg(i.UserName, i.Picture)
        profileBtn();
    })
}

function profileBtn() {
    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener("click", () => {
            infoContent[i].style.display = "block";
            saveBtn[i].style.display = "block";
            deleteBtn[i].style.display = "block";
            editBtn[i].style.display = "none";
            infoPara[i].style.display = "none";
        })

        saveBtn[i].addEventListener("click", () => {
            infoContent[i].style.display = "none";
            saveBtn[i].style.display = "none";
            deleteBtn[i].style.display = "none";
            editBtn[i].style.display = "block";
            infoPara[i].style.display = "block";
        })
    }
}