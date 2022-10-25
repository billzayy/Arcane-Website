import * as alias from './func.mjs'
const content = document.querySelector('.content-text')
window.addEventListener("DOMContentLoaded", () => {
    alias.setUser();
    alias.logoutAct();
    alias.scrollPage();
    alias.moveCart();
    alias.countCart();
    alias.moveProfile();

    showContact()
})

async function showContact() {
    let result = "";
    const res = await fetch("http://localhost:3000/api/contact");
    const data = await res.json()
    data.forEach(i => {
        result += 
            `<div class="content-left">
                <img src="${i.Map}" alt="">
            </div>
            <div class="content-right">
                <div class="content-head">
                    ${i.Title}
                </div>
                <div class="section-work-hour">
                    <div class="content-title">Work hours</div>
                    <div class="content-info">${i.Work_hour}</div>
                </div>
                <div class="section-address">
                    <div class="content-title">Address</div>
                    <div class="content-info">${i.Address}</div>
                </div>
                <div class="section-email">
                    <div class="content-title">E-mail</div>
                    <div class="content-info">${i.Email}</div>
                </div>
                <div class="section-phone">
                    <div class="content-title">Phone number</div>
                    <div class="content-info phone">${i.Phone}</div>
                </div>
            </div>`
        content.innerHTML = result
    })
}
