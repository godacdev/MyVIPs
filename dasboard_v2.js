import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

class User {
    Username;
    Senha;
    ContatosVIP = [];

    static CadastrarVIP (nome, email, idade, status) {
        return new VIPs(nome, email, idade, status)
    }

    static FindVIP (id) {
        return this.ContatosVIP.filter(vip => {
            if (vip.Id == id) {
                return vip;
            }
        });
    }

    static AlterarVIP (id, nome, email, idade, status) {
        let vip = this.FindVIP(id);
        if (vip) {
            vip.Nome = nome;
            vip.Email = email;
            vip.Idade = idade;
            vip.Status = status;
        }
    }

    static DeleteVIP (id) {
        for (let i = 0; i < this.ContatosVIP.length; i++)
        if (this.ContatosVIP[i].Id == id) {
            this.ContatosVIP.splice(i, 1);
        }
    }
    
    constructor (username, senha) {
        this.Username = username;
        this.Senha = senha;
    }
}

class VIPs {
    Id;
    Nome;
    Email;
    Idade;
    Status;
    
    constructor (nome, email, idade, status) {
        this.Id = uuidv4().slice(0, 8);
        this.Nome = nome;
        this.Email = email;
        this.Idade = idade;
        this.Status = status;
    }
}

$(document).ready(() => {

    $("#msg .alert").hide();

    if (!verificaLogin()) {
        window.location.href = "index.html";
    }

    $('#btn-cria-vip').click((e) => {
        e.preventDefault();
        if (getItem('userLogado')) {
            let user = JSON.parse(getItem(getItem('userLogado')))
            console.log(user);
            let nome = $('#input-nome').val();
            let email = $('#input-email').val();
            let idade = $('#input-idade').val();
            let status = $('#select-status').val();
            let vip = User.CadastrarVIP(nome, email, idade, status);
            user.ContatosVIP.push(vip);
            setJsonItem(user.Username, user);
        } else {
            alert('Ei, o que você está fazendo aqui?, você não está logado!');
        }

        ListarContatos();
    })

    ListarContatos();
})

// Functions

function ListarContatos() {
    var listaHTML = $("#lista-contatos");
    listaHTML.html("");
    let user = getJsonItem(getItem('userLogado'));

    if (user.ContatosVIP == null || user.ContatosVIP.length <= 0) return;

    user.ContatosVIP.forEach((vip) => {
        var linha = document.createElement("tr");
        var colId = document.createElement("td");
        var colNome = document.createElement("td");
        var colEmail = document.createElement("td");
        var colIdade = document.createElement("td");
        var colStatus = document.createElement("td");
        var colActions = document.createElement("td");
        $(colActions).html(`<div class="d-flex">
            <button class="btn btn-sm btn-danger btn-actions btn-excluir-vip"><img src="_img/trash.svg"></button>
            <button class="btn btn-sm btn-warning btn-actions btn-editar-vip"><img src="_img/pencil.svg"></button>
        </div>`);

        $(colId).html(vip.Id);
        $(colNome).html(vip.Nome);
        $(colEmail).html(vip.Email);
        $(colIdade).html(vip.Idade);
        $(colStatus).html(vip.Status);
        $(linha).append(colId).append(colNome).append(colEmail).append(colIdade).append(colStatus).append(colActions);
        listaHTML.append(linha);

        addEventDeleteVip(vip.Id);
        addEventEditVip(vip.Id);
    });
}

function verificaLogin () {
    if (getItem('userLogado')) {
        return true
    } else {
        return false
    }
}

function removeItemList (id) {
    let user = getJsonItem(getItem('userLogado'));
    let contagem = 0;
    user.ContatosVIP.forEach(vip => {
        if (vip.Id === id) {
            return user.ContatosVIP.splice(contagem, 1);
        }
        contagem++;
    })
    setJsonItem(user.Username, user);
    ListarContatos();
}

function addEventDeleteVip (id) {
    $('.btn-excluir-vip').click((e) => {
        removeItemList(id);
    })
}

function editItemList (id) {

}
function addEventEditVip (id) {
    $('.btn-editar-vip').click((e) => {
        removeItemList(id);
    })
}