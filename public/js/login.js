document.addEventListener("DOMContentLoaded", () => {
    let loginForm = document.forms.loginForm;
    let registerForm = document.forms.registerForm;

    loginForm.onsubmit = () => {
        let data = {};
        (new FormData(loginForm)).forEach((value, key) => {
            data[key] = value;
        });
        login(JSON.stringify(data));
        return false;
    };

    registerForm.onsubmit = () => {
        let data = {};
        (new FormData(registerForm)).forEach((value, key) => {
            data[key] = value;
        });
        register(JSON.stringify(data));
        return false;
    };
});

function setLoginError(message) {
    let elem = document.getElementById("login-error");
    if (message) {
        elem.innerHTML = message;
        elem.style.display = "block"
    } else {
        elem.style.display = "none"
    }
}

function setRegisterError(message) {
    let elem = document.getElementById("register-error");
    if (message) {
        elem.innerHTML = message;
        elem.style.display = "block"
    } else {
        elem.style.display = "none"
    }
}

function showLogin() {
    document.getElementById("login-modal").style.display = "block";
    document.forms.loginForm.style.display = "block";
    document.forms.registerForm.style.display = "none";
    document.getElementById("login-login-header").classList.remove("w3-text-blue");
    document.getElementById("login-register-header").classList.add("w3-text-blue");
    setLoginError();
}

function showRegister() {
    document.getElementById("login-modal").style.display = "block";
    document.forms.loginForm.style.display = "none";
    document.forms.registerForm.style.display = "block";
    document.getElementById("login-login-header").classList.add("w3-text-blue");
    document.getElementById("login-register-header").classList.remove("w3-text-blue");
    setRegisterError();
}

function hideLogin() {
    document.getElementById("login-modal").style.display = "none";
}

function login(data) {
    setLoginError();
    let request = new XMLHttpRequest();
    request.open("POST", "/login");
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send(data);

    request.onload = () => {
        console.log(request);
        if (request.status === 200)
            window.location.reload();
        else {
            setLoginError(request.response?.error);
        }
    };
    request.onerror = () => {
        console.log(request);
        setLoginError("Неизвестная ошибка");
    };
}

function register(data) {
    setRegisterError();
    let request = new XMLHttpRequest();
    request.open("POST", "/register");
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send(data);

    request.onload = () => {
        console.log(request);
        if (request.status === 200)
            window.location.reload();
        else {
            console.log(request.status);
            setRegisterError(request.response?.error);
        }
    };
    request.onerror = () => {
        setRegisterError("Неизвестная ошибка");
    };
}