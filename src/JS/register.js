const registerText = document.querySelectorAll('.input-register')
const signBtn = document.querySelector('.register-btn')

signBtn.addEventListener('click', async () => {
    var name = registerText[0].value;
    var password = registerText[1].value;
    var email = registerText[2].value;
    const usernameArr = [];
    const emailArr = [];

    const checkAccount = await fetch('http://localhost:3000/api/login');
    const dataCheck = await checkAccount.json()
    dataCheck.forEach(i => { 
        usernameArr.push(i.UserName);
        emailArr.push(i.Email);
    })
    
    if (usernameArr.includes(name) || emailArr.includes(email)) {
        alert('Please enter a another username or Email !');
        window.location.reload();
    }
    else {
        try {
            const res = await fetch(`http://localhost:3000/login/${name}/${password}/${email}`)
            const data = await res.json();
            alert("Your account has been created!");
            window.location.reload();
        }
        catch {
            alert("Can't Sign up your account!")
            window.location.reload();
        }
    }
})