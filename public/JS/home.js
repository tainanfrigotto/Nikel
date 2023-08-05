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

    getCashin();
    getCashout();
    gettotal();

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

    getCashin();
    getCashout();
    gettotal();
}

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href="index.html";
}

function getCashin(){
    const transactions = data.transactions;

    const cashin = transactions.filter((item) => item.type === "1");

    if(cashin.length){
        let cashinhtml = ``;
        let limit = 0;
    
        if(cashin.length > 5) {
            limit = 5;
         } else {
            limit = cashin.length;
         }
    
         for (let index = 0; index < limit; index++) {
             cashinhtml += `
            <div class="row ">
                <div class="col-12">
                    <h3 class="fs-3">R$ ${cashin[index].value.toFixed(2)}</h3>
                        <div class="=container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${cashin[index].description} </p>
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end ">
                                    ${cashin[index].date}
                                </div>
                            </div>
                        </div>
                </div>                                                                                
            </div>
             `
        }

        document.getElementById("cashinlist").innerHTML = cashinhtml;
            
    }

}

function getCashout(){
    const transactions = data.transactions;

    const cashout = transactions.filter((item) => item.type === "2");

    if(cashout.length){
        let cashouthtml = ``;
        let limit = 0;
    
        if(cashout.length > 5) {
            limit = 5;
         } else {
            limit = cashout.length;
         }
    
         for (let index = 0; index < limit; index++) {
             cashouthtml += `
            <div class="row ">
                <div class="col-12">
                    <h3 class="fs-3">R$ ${cashout[index].value.toFixed(2)}</h3>
                        <div class="=container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${cashout[index].description} </p>
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end ">
                                    ${cashout[index].date}
                                </div>
                            </div>
                        </div>
                </div>                                                                                
            </div>
             `
        }

        document.getElementById("cashoutlist").innerHTML = cashouthtml;
            
    }

}

function gettotal() {
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item)=> {
        if(item.type === "1") {
            total +=item.value;
        }else {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}



function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}