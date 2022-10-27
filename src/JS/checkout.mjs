async function checkout() {
    const res = await fetch(`http://localhost:3000/api/bill/showApi`);
    const data = await res.json();
    console.log(data)
}

async function addBill(idClient, dateTime, discount, delivery, price) {
    const res = await fetch(`http://localhost:3000/api/bill/add/${idClient}/${dateTime}/${discount}/${delivery}/${price}`)
    const data = await res.json();
    console.log(data)
}
//Checkout Function
function checkoutClick() {
    const checkoutBtn = document.querySelector('.btn-checkout');

    const client = sessionStorage.getItem('idClient');
    const dateTime = getDayFunc();
    const discount = document.querySelector('.order-discount span').textContent;
    const delivery = document.querySelector('.order-delivery span').textContent;
    const price = parseInt(document.querySelector('.order-total span').textContent.split('$')[1]);
    checkoutBtn.addEventListener('click', async () => {
        // await addBill(client, dateTime, discount, delivery, price)
        console.log(price);
    })
}

function getDayFunc() {
    const data = new Date();
    let result = "";
    const day = checkDate(data.getDay() + 1);
    const date = addZero(data.getDate());
    const month = data.getMonth();
    const year = data.getFullYear();
    const hours = addZero(data.getHours());
    const minute = addZero(data.getMinutes());
    const second = addZero(data.getSeconds());
    result = `${day}, ${checkMonth(month)} ${date} ${year} - ${hours}:${minute}:${second}`
    return result;
}

function checkDate(date) {
    switch (date) {
        case 1:
            return "Sunday";
        case 2:
            return "Monday";
        case 3:
            return "Tuesday";
        case 4:
            return "Wednesday";
        case 5:
            return "Thursday";
        case 6:
            return "Friday";
        case 7:
            return "Saturday";
    }
}
function checkMonth(date) {
    switch (date) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
    }
}

function addZero(value) {
    if (value < 10) {
        return `0${value}`
    }
    else {
        return value
    }
}

export {
    checkout,
    checkoutClick
}