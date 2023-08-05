const nome = "Marcelo Eltz";
let nome2 = "";
let pessoaDefault = {
    nome: "Marcelo Eltz",
    idade: "33",
    trabalho: "programador"
}



function alterarNome() {
    nome2 = "Maria Silva";
    console.log("Valor Alterado:");
    console.log(nome2);
}

function recebeEalteraNome(novoNome){
    nome2 = novoNome;
    console.log("Valor Alterado recebendo um nome:");
    console.log(nome2);
}

function imprimirPessoa(pessoa){
    console.log("Nome:");
    console.log(pessoa.nome)

    console.log("Idade:");
    console.log(pessoa.idade)

    console.log("Trabalho:");
    console.log(pessoa.trabalho)
}
imprimirPessoa(pessoaDefault);

imprimirPessoa({
    nome: "Maria Silva",
    idade: "25",
    trabalho: "UX/UI designer"
})

//recebeEalteraNome("João Silva Pereira");
//recebeEalteraNome("Maria Silva")

//alterarNome(); 