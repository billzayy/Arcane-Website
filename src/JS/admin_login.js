import * as alias from './func.mjs'
import { sideBarBtn } from './user-side-btn.js';

const adminSection = document.querySelector('.content .admin-container');
const fillSection = document.querySelector('.fill-section');
const fillBox = document.querySelectorAll('.fill-text');
const deleteBtn = document.querySelectorAll('.delete-btn');
const button = document.querySelectorAll('button')

const addBtn = document.querySelector('.add-btn');
const addFillBtn = document.querySelector('.add-fill-btn')

const content = document.querySelector('tbody');
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
                    <button>Edit</button>
                    <button class='delete-btn'>Delete</button>
                </td>
            </tr>
            `
        arr.push(user.Id_Login);
    })
    content.innerHTML = result;
    deleteClick(arr)
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
            await alert("Add user Successful!");
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