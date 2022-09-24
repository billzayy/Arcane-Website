import * as alias from './func.mjs'
import { sideBarBtn } from './user-side-btn.js';

const content = document.querySelector('.content');

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

async function profileSection() {
    let result = '';
    const res = await fetch(`http://localhost:3000/api/login`);
    const data = await res.json();
    data.forEach(i => {
        if (i.UserName == sessionStorage.getItem('user')) {
            result += `
            <div class="picture-section">
                    <img src="../img/Gradient.jpeg" alt="">  
                    <div class="user">
                        <div class="pic">
                            <img>
                            <input type="file">
                            <div class="side-btn">
                                <a>Change</a>
                                <a>Delete</a>
                            </div>
                        </div>
                        <div class="username">
                            <p>${i.FullName}</p>
                            <p class="email">${i.Email}</p>
                        </div>
                    </div>
                    
                </div>
                <div class="info-section">
                    <div class="info">
                        <div class="info-title">Full Name</div>
                        <div class="info-content">
                            <div class="info-text">
                                <input type="text" value = "${i.FullName}">
                                <p>${i.FullName}</p>
                            </div>
                            <div class="btn">
                                <a class="edit-btn">Edit</a>
                                <a class="save-btn">Save</a>
                                <a class="info-delete-btn">Delete</a>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="info-title">Email</div>
                        <div class="info-content">
                            <div class="info-text">
                                <input type="text" value="${i.Email}">
                                <p>${i.Email}</p>
                            </div>
                            <div class="btn">
                                <a class="edit-btn">Edit</a>
                                <a class="save-btn">Save</a>
                                <a class="info-delete-btn">Delete</a>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="info-title">UserName</div>
                        <div class="info-content">
                            <div class="info-text">
                                <input type="text" value="${i.UserName}">
                                <p>${i.UserName}</p>
                            </div>
                            <div class="btn">
                                <a class="edit-btn">Edit</a>
                                <a class="save-btn">Save</a>
                                <a class="info-delete-btn">Delete</a>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="info-title">Password</div>
                        <div class="info-content">
                            <div class="info-text">
                                <input type="text" value="${i.Password}">
                                <p>${i.Password}</p>
                            </div>
                            <div class="btn">
                                <a class="edit-btn">Edit</a>
                                <a class="save-btn">Save</a>
                                <a class="info-delete-btn">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
            `
            content.innerHTML = result;
            checkImg(i.Picture)
            profileBtn()
            passwordHide()
        }
    });
}

function checkImg(picture) {
    const checkImgBox = document.querySelector('.user .pic img');
    const addImgBox = document.querySelector('.user .pic input');
    const picBtn = document.querySelector('.user .pic .side-btn');

    if (picture != null) {
        checkImgBox.outerHTML = `<img src="${picture}"></img>`;
        addImgBox.style.display = 'none';
    }
    else {
        checkImgBox.outerHTML = `<img src="../img/User/User-none.jpeg"></img>`
        picBtn.style.display = 'none'
    }
}

function profileBtn() {
    const editBtn = document.querySelectorAll('.edit-btn');
    const infoContent = document.querySelectorAll('.info-text input');
    const saveBtn = document.querySelectorAll('.save-btn');
    const infoPara = document.querySelectorAll('.info-text p');
    const deleteBtn = document.querySelectorAll('.info-delete-btn');

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
            addProfile();
        })
    }
}

function passwordHide() {
    const passwordBox = document.querySelectorAll('.info-text p');

    const string = passwordBox[passwordBox.length - 1].textContent;
    let result = ""
    for (let i = 0; i < string.length; i++) {
        result += "*"
    }
    passwordBox[passwordBox.length - 1].textContent = result;
}

function addProfile() {
    const changeBox = document.querySelectorAll('.info-text input');
    const userName = changeBox[2].value;
    const fullName = changeBox[0].value;
    const email = changeBox[1].value;
    const password = changeBox[3].value;
    addProfileAPI(userName, fullName, email, password);
}

async function addProfileAPI(username, fullname, email, password) {
    const idClient = sessionStorage.getItem('idClient');
    await fetch(`http://localhost:3000/api/profile/add/${idClient}/${username}/${fullname}/${email}/${password}`)
    alert("Change Profile Successful !");
    window.location.reload();
}