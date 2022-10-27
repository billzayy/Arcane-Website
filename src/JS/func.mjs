const btnUser = document.querySelector('.btn-user');
const userBox = document.querySelector('.user-box');
const dropdown = document.querySelector('.dropdown');
const topLink = document.querySelector('.top-link-btn');
const logoutBtn = document.querySelector('.btn-logout');
const cartBtn = document.querySelector('.btn-cart');

function changeColorSale(sale, price) {
    if (sale.textContent == "Sale") {
        sale.style.color = '#FF47C1'
        price.style.color = '#FF47C1';
    }
    else if (sale.textContent == 'New') {
        sale.style.color = '#63CEFC'
        price.style.color = '#63CEFC';
    }
    else if (sale.textContent == 'Top') {
        sale.style.color = '#98A0E8'
        price.style.color = '#98A0E8';
    }
    else {
        sale.style.display = "none";
        price.style.color = "#8F1933"
    }
}

function setUser() {
    if (sessionStorage.getItem('user') != null) {
        userBox.innerHTML = sessionStorage.getItem('user')
    }
    else {
        userBox.innerHTML = "Guest"
    }
}

function logoutAct() {
    if (userBox.innerHTML == "Guest") {
        btnUser.addEventListener("click", () => {
            window.location.href = "http://localhost:3000/login"
        })
    }
    else if (userBox.innerHTML == sessionStorage.getItem('user')) {
        btnUser.addEventListener('mouseover', () => {
            dropdown.style.display = "block";
        })
        btnUser.addEventListener('mouseout', () => {
            dropdown.style.display = "none";
        })
    }

    logoutBtn.addEventListener('click', () => {
        sessionStorage.clear();
        window.location.href = "http://localhost:3000/login"
    })
}

function scrollPage() {
    window.addEventListener("scroll", () => {
        const scrollHeight = window.pageYOffset;

        if (scrollHeight > 500) {
            topLink.classList.add('show-link-btn')
        }
        else {
            topLink.classList.remove('show-link-btn')
        }
    })

    topLink.addEventListener('click', () => {
        window.scrollTo(
            {
                left: 0,
                top: 0,
            }
        );
    })
}

function moveCart() {
    cartBtn.addEventListener('click', () => {
        if (sessionStorage.getItem('user') == null) {
            alert("Please Sign in!!!");
            location.reload();
        }
        else {
            location.href = "http://localhost:3000/cart"
        }
    })
}

async function countCart() {
    const btnCart = document.querySelector('.btn-cart span')
    let idClient = parseInt(sessionStorage.getItem('idClient'))
    let sum = 0;
    if (Number.isNaN(idClient)) {
        // alert("Welcome Guest ! Please sign up or log in to buy our products !")
        btnCart.innerHTML = ``
    }
    else {
        const res = await fetch(`http://localhost:3000/api/shoppingcart/${idClient}`)
        const data = await res.json()
        data.forEach(i => {
            sum = sum + i.Quantity;
        })
        btnCart.innerHTML = `(${sum})`
    }
}

function moveContact() {
    const contactBtn = document.querySelector('.contact-btn');
    contactBtn.addEventListener('click', () => {
        location.href = 'http://localhost:3000/contact'
    })
}

function moveProfile() {
    const profileBtn = document.querySelector('.btn-profile');
    const settingBtn = document.querySelector('.btn-setting');
    profileBtn.addEventListener('click', () => {
        location.href = 'http://localhost:3000/user/profile';
    })
    settingBtn.addEventListener('click', () => {
        location.href = 'http://localhost:3000/user/setting';
    })
}
export {
    changeColorSale,
    setUser,
    logoutAct,
    scrollPage,
    moveCart,
    countCart,
    moveContact,
    moveProfile
}
