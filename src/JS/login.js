const loginBtn = document.querySelector('.login-btn')
const registerBtn = document.querySelector('.register-btn')
const socialBtn = document.querySelectorAll('.social-btn')
const spanBtn = document.querySelectorAll('span');

const loginContainer = document.querySelector('.login-container')
const registerContainer = document.querySelector('.register-container')
const inputBox = document.querySelectorAll('.input-login');
const idBox = document.querySelector('.id-client')

loginBtn.addEventListener('click', () => {
   CheckLogin(inputBox[0].value,inputBox[1].value);
})

socialBtn.forEach(i => { 
    i.addEventListener('click', () => {
        alert(`We can't connect with ${i.childNodes[3].outerText} !`)
    })
})

spanBtn.forEach(i => { 
    i.addEventListener('click', () => {
        if (i.textContent == "Register now") {
            loginContainer.style.display = "none";
            registerContainer.style.display = "flex"
        }
        else { 
            loginContainer.style.display = "flex";
            registerContainer.style.display = "none"
        }
    })
})

async function CheckLogin(username, password) { 
    const usernameArr = [];
    const passwordArr = [];
    const res = await fetch("http://localhost:3000/api/login");
    const data = await res.json()
    data.forEach(i => {
        usernameArr.push(i.UserName);
        passwordArr.push(i.Password);
        if (username == i.UserName) {
            idBox.innerHTML = i.Id_Login;
            sessionStorage.setItem('idClient', parseInt(idBox.innerHTML))
        }
    })
    if (usernameArr.includes(username) && passwordArr.includes(password)) {
        // alert("Log in Successful !");
        sessionStorage.setItem("user", username);
        window.location.href = "http://localhost:3000/";
    }
    else { 
        alert("Failed to Log in ! Try Again!");
        window.location.reload();
    }
}
