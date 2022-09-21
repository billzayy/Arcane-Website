const profilePage = document.querySelectorAll('.personal-btn li');
const adminPage = document.querySelectorAll('.admin-btn li');

const listPerson = document.querySelector('.personal-btn');
const listAdmin = document.querySelector('.admin-btn');
const arrow = document.querySelectorAll('.arrow .fa-caret-up');

// Button
const personBtn = document.querySelector('.title-personal');
const adminBtn = document.querySelector('.title-admin');
const logoutBtn = document.querySelector('.logout-section')


function sideBarBtn() {
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

    profilePage.forEach(i => {
        i.addEventListener("click", (e) => {
            switch (e.target.textContent.toLowerCase()) {
                case "profile":
                    location.href = "http://localhost:3000/user/profile";
                    break;
                case "history":
                    location.href = "http://localhost:3000/user/history";
                    break;
                case "setting":
                    location.href = "http://localhost:3000/user/setting";
                    break;
            }
        })
    })
    adminPage.forEach(i => {
        i.addEventListener("click", (e) => {
            switch (e.target.textContent.toLowerCase()) {
                case "user management":
                    location.href = "http://localhost:3000/admin/user_management";
                    break;
                case "product management":
                    location.href = "http://localhost:3000/admin/product_management";
                    break;
            }
        })
    })
}

export {
    sideBarBtn
}