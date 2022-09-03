const profilePage = document.querySelector('.profile-container');
const settingPage = document.querySelector('.setting-container');
const historyPage = document.querySelector('.history-container');
const adminPage = document.querySelector('.admin-container');
const adminProduct = document.querySelector('.admin-product');
const adminUser = document.querySelector('.admin-user');

const personListBtn = document.querySelectorAll('.side-bar li');

function sideBarBtn() {
    personListBtn.forEach(i => {
        i.addEventListener("click", () => {
            var text = i.textContent;
            console.log(text)
            switch (text) {
                case "Setting":
                    profilePage.style.display = "none";
                    settingPage.style.display = "block";
                    historyPage.style.display = "none";
                    adminPage.style.display = "none";
                    adminProduct.style.display = "none";
                    adminUser.style.display = "none";
                    break;
                case "History":
                    profilePage.style.display = "none";
                    settingPage.style.display = "none";
                    historyPage.style.display = "block";
                    adminPage.style.display = "none";
                    adminProduct.style.display = "none";
                    adminUser.style.display = "none";
                    break;
                case "User Management":
                    profilePage.style.display = "none";
                    settingPage.style.display = "none";
                    historyPage.style.display = "none";
                    adminPage.style.display = "block";
                    adminProduct.style.display = "none";
                    adminUser.style.display = "block";
                    break;
                case "Product Management":
                    profilePage.style.display = "none";
                    settingPage.style.display = "none";
                    historyPage.style.display = "none";
                    adminPage.style.display = "block";
                    adminProduct.style.display = "block";
                    adminUser.style.display = "none";
                    break;
                default:
                    profilePage.style.display = "block";
                    settingPage.style.display = "none";
                    historyPage.style.display = "none";
                    adminProduct.style.display = "none";
                    adminUser.style.display = "none";
                    break;
            }
        })
    })
}
export {
    sideBarBtn
}