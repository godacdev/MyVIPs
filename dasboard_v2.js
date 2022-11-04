import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

class User {
    Username;
    Senha;
    ContatosVIP = [];

    static CadastrarVIP (nome, email, idade, status) {
        return new VIPs(nome, email, idade, status)
    }

    static FindVIP (id) {
        let user = getJsonItem(getItem('userLogado'));
        return user.ContatosVIP.filter(vip => {
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

    $('#btn-edita-vip').hide();
    $("#msg .alert").hide();
    LimpaCampos();

    if (!verificaLogin()) {
        window.location.href = "index.html";
    }

    $('#btn-cria-vip').click((e) => {
        e.preventDefault();
        if (getItem('userLogado')) {
            CreateVIP();
        } else {
            alert('Ei, o que você está fazendo aqui?, você não está logado!');
        }

        LimpaCampos();
        ListarContatos();
    })

    $('#btn-edita-vip').click((e) => {
        e.preventDefault();
        let vipId = $('#input-id-vip').val();
        EditVIP(vipId);
        $('#btn-cria-vip').show();
        $('#btn-edita-vip').hide();
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
            <button id="btn-excluir-${vip.Id}" class="btn btn-sm btn-danger btn-actions">&times;</button>
            <button id="btn-editar-${vip.Id}" class="btn btn-sm btn-warning btn-actions">&times;</button>
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

function CreateVIP () {
    let user = getJsonItem(getItem('userLogado'));
    let nome = $('#input-nome').val();
    let email = $('#input-email').val();
    let idade = $('#input-idade').val();
    let status = $('#select-status').val();
    let vip = User.CadastrarVIP(nome, email, idade, status);
    user.ContatosVIP.push(vip);
    setJsonItem(user.Username, user);
}

function RemoveVIP (id) {
    let user = getJsonItem(getItem('userLogado'));
    let contagem = 0;
    user.ContatosVIP.forEach(vip => {
        if (vip.Id === id) {
            return user.ContatosVIP.splice(contagem, 1);
        }
        contagem++;
    })
    setJsonItem(user.Username, user);
    LimpaCampos();
    ListarContatos();
    $('#btn-cria-vip').show();
    $('#btn-edita-vip').hide();
}

function EditVIP (id) {
    let user = getJsonItem(getItem('userLogado'));
    let contagem = 0;
    user.ContatosVIP.forEach(vip => {
        if (vip.Id === id) {
            return user.ContatosVIP.splice(contagem, 1);
        }
        contagem++;
    })

    let nome = $('#input-nome').val();
    let email = $('#input-email').val();
    let idade = $('#input-idade').val();
    let status = $('#select-status').val();
    let vip = User.CadastrarVIP(nome, email, idade, status);
    vip.Id = id;
    user.ContatosVIP.splice(contagem, 0, vip);
    setJsonItem(user.Username, user);

    LimpaCampos();
    ListarContatos();
}

function PopulaEditForm (id) {
    $('#btn-cria-vip').hide();
    $('#btn-edita-vip').show();
    let vip = User.FindVIP(id);
    $('#input-nome').val(vip[0].Nome);
    $('#input-email').val(vip[0].Email);
    $('#input-idade').val(vip[0].Idade);
    $('#select-status').val(vip[0].Status);
    $('#input-id-vip').val(vip[0].Id);
}

function addEventDeleteVip (id) {
    $(`#btn-excluir-${id}`).click((e) => {
        RemoveVIP(id);
    })
}

function addEventEditVip (id) {
    $(`#btn-editar-${id}`).click((e) => {
        PopulaEditForm(id);
    })
}

function LimpaCampos () {
    $('#input-nome').val("");
    $('#input-email').val("");
    $('#input-idade').val("");
    $('#select-status').val("");
    $('#input-id-vip').val("");
}