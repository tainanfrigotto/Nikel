const mymodal = new bootstrap.Modal("#addModal");
let logged = sessionStorage.getItem("logged");
const session=localStorage.getItem("session");

let data={
    transactions:[]
}

document.getElementById("buttonlogout").addEventListener("click", logout);



//ADICIONAR LANÇAMENTO
document.getElementById("transactions-form").addEventListener("submit", function(e){
    e.preventDefault();

    const date = document.getElementById("date-input").value;
    const valor = parseFloat(document.getElementById("input-value").value);
    const description = document.getElementById("description-input").value;
    const type = document.querySelector('input[name="input-type"]:checked').value;
    
    data.transactions.unshift({
        value: valor, date: date, description: description, type: type
    }); 
    
    saveData(data);
    e.target.reset();
    mymodal.hide();

    getTransactions();

    alert("Lançamento adicionado com sucesso!");

})

checklogged();

function checklogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged=session;
    }

    if(!logged){
        window.location.href="index.html";
        return;
    }

    const dataUser=localStorage.getItem(logged);
    if(dataUser){
        data=JSON.parse(dataUser);
    }

    getTransactions();
   
}

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href="index.html";
}

function getTransactions(){
    const transactions = data.transactions;
    let transactionshtml = ``;

    if(transactions.length){
        transactions.forEach((item) => {
            let type = "Entrada";

            if(item.type === "2"){
                type = "Saída";
            }

            transactionshtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>                                    
                    </tr>
            `
        });
    }

    document.getElementById("transactionslist").innerHTML = transactionshtml;

}

    

function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}