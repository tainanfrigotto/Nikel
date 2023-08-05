const mymodal = new bootstrap.Modal("#registerModal");
let logged = sessionStorage.getItem("logged");
const session=localStorage.getItem("session");

checklogged();

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("InputEmail").value;
    const password = document.getElementById("InputPassword").value;
    const session = document.getElementById("check").checked;

    const account=getaccount(email);

    if(!account) {
        alert("Opss! Verifique o usuário ou a senha.");
        return;
    }

    if(account){
        if(account.password !== password){
        alert("Opss! Verifique o usuário ou a senha.");
        return; 
        }

        saveSession(email, session);


        window.location.href="home.html";

    }


})

//CRIAR CONTA

document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("InputEmail1").value;
    const password = document.getElementById("InputPassword1").value;;

    if(email.length < 5){
        alert("Preencha o campo com um email válido")
        return;
    }

    if(password.length < 4){
        alert ("A senha deve possuir no mínimo 4 dígitos")
        return;
    }

    saveaccount({
        login: email,
        password: password,
        transactions: []
    })
    mymodal.hide();

    alert("Conta criada com sucesso!");
}) 

function checklogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged=session;
    }

    if(logged){
        saveSession(logged, session)

        window.location.href="home.html";
    }
}

function saveaccount(data){
    localStorage.setItem(data.login, JSON.stringify(data) );
}

function saveSession(data, saveSession){
    if(saveSession){
        localStorage.setItem("session", data);
    }
    sessionStorage.setItem("logged", data); 

}

function getaccount(key){
    const account=localStorage.getItem(key)

    if(account){
        return JSON.parse(account);
    }
    return "";
}

