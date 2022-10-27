import * as alias from './func.mjs'
import { sideBarBtn } from './user-side-btn.js';

const adminSection = document.querySelector('.content .admin-container');
const fillSection = document.querySelector('.fill-section');
const editSection = document.querySelector('.edit-section');
const fillBox = document.querySelectorAll('.fill-text');

const addBtn = document.querySelector('.add-btn');
const addFillBtn = document.querySelector('.add-fill-btn')

const content = document.querySelector('tbody');
const editContent = document.querySelector('.edit-content');
var arr = [];
window.addEventListener("DOMContentLoaded", () => {
    alias.setUser();
    alias.logoutAct();
    alias.scrollPage();
    alias.moveCart();
    alias.countCart();
    alias.moveContact();
    alias.moveProfile();

    sideBarBtn();
    showUser();
    addClick();
})

async function showUser() {
    var result = "";
    const res = await fetch(`http://localhost:3000/api/login`);
    const data = await res.json();
    data.forEach((user) => {
        result +=
            `
            <tr>
                <td>${user.UserName}</td>
                <td>${user.Password}</td>
                <td>${user.Email}</td>
                <td>${user.FullName}</td>
                <td>${user.Picture}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class='delete-btn'>Delete</button>
                </td>
            </tr>
            `
        arr.push(user.Id_Login);
    })
    content.innerHTML = result;
    deleteClick(arr);
    editClick(arr);
    backClick();
}

async function editUser(idClient) {
    var result = "";
    const res = await fetch(`http://localhost:3000/api/login`);
    const data = await res.json();
    data.forEach((user) => {
        if (user.Id_Login == idClient) {
            result +=
            `
                <div class="edit-header">
                    <div class="back-edit-btn">
                        <i class="fas fa-arrow-left">Back</i>
                    </div>
                    <h2>Edit</h2>
                </div>
                <div class="edit-box">
                    <p class="edit-title">User Name :</p>
                    <input type="text" name="Name" class="edit-text" value = "${user.UserName}">
                </div>
                <div class="edit-box">
                    <p class="edit-title">Password:</p>
                    <input type="password" name="Password" class="edit-text" value = "${user.Password}">
                </div>

                <div class="edit-box">
                    <p class="edit-title">Email :</p>
                    <input type="email" name="Email" class="edit-text" value = "${user.Email}">
                </div>
                <div class="edit-box">
                    <p class="edit-title">Full Name :</p>
                    <input type="text" name="Full Name" class="edit-text" value = "${user.FullName}">
                </div>
                <div class="edit-box">
                    <p class="edit-title">Picture :</p>
                    <input type="file" name="Picture" class="edit-text" value = "${user.Picture}">
                </div>
                <div class="btn-edit-section">
                    <p class="save-edit-btn">Save</p>
                </div>    
            `
        }
        backClick();
    })
    editContent.innerHTML = result;
    const backEditBtn = document.querySelector('.back-edit-btn');

    backEditBtn.addEventListener('click', () => {
        location.href = 'http://localhost:3000/admin/user_management';
    })
    saveClick(idClient);
}

function addClick() {
    addBtn.addEventListener('click', () => {
        adminSection.classList.toggle('close');
        fillSection.classList.toggle('active');
    })

    addFillBtn.addEventListener('click', async () => {
        try {
            var name = fillBox[0].value;
            var password = fillBox[1].value;
            var email = fillBox[2].value;
            var fullName = fillBox[3].value;
            await addUser(name, password, email, fullName);
            alert("Add user Successful!");
            adminSection.classList.toggle('close');
            fillSection.classList.toggle('active');
            location.reload();
        }
        catch {
            alert("Error to add user!");
            location.reload();
        }
    })
}

function deleteClick(arr) {
    const deleteBtn = document.querySelectorAll('.delete-btn');
    for (let i = 0; i < arr.length; i++) {
        deleteBtn[i].addEventListener('click', async () => {
            console.log(arr[i])
            try {
                deleteUser(arr[i]);
                alert("User deleted!");
                window.location.reload();
            }
            catch{
                alert("Error to delete User");
                window.location.reload();
            }
        })
    }
}

function editClick(idClient) {
    const editBtn = document.querySelectorAll('.edit-btn');
    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener('click', () => {
            editUser(idClient[i]);
            adminSection.classList.toggle('close');
            editSection.classList.toggle('active');
        })
    }
}

function backClick() {
    const backBtn = document.querySelector('.fa-arrow-left');
    backBtn.addEventListener('click', () => {
        location.href = 'http://localhost:3000/admin/user_management';
    })
}

function saveClick(idClient) {
    const saveEditBtn = document.querySelector('.save-edit-btn');

    const editText = document.querySelectorAll('.edit-text')
    
    saveEditBtn.addEventListener('click', async () => {
        try {
            let userName = editText[0].value;
            let password = editText[1].value;
            let email = editText[2].value;
            let fullName = editText[3].value;
            editUserData(idClient, userName, password, email, fullName);
            alert("Edit User's Profile Success !");
            window.location.reload();
        }
        catch {
            alert("Error Edit User's Profile ! Please try again");
            window.location.reload();
        }
    })
}

async function addUser(name, password, email, fullName) {
    const res = await fetch(`http://localhost:3000/admin/user_management/add/${name}/${fullName}/${email}/${password}`);
    const data = await res.json();
    console.log(data)
}

async function deleteUser(idLogin) {
    const res = await fetch(`http://localhost:3000/admin/user_management/delete/${idLogin}`);
    const data = await res.json();
    console.log(data);
}

async function editUserData(idClient ,name, password, email, fullName) {
    const res = await fetch(`http://localhost:3000/admin/user_management/edit/${idClient}/${name}/${password}/${fullName}/${email}`);
    const data = await res.json();
    console.log(data)
}