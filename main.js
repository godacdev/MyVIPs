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

// Eventos

$('document').ready(() => {
    $('#btn-cadastrar').click((e) => {
        e.preventDefault();
        let username = $('#input-registro-username').val();
        let senha = $('#input-registro-senha').val();
        let senhaRepeat = $('#input-registro-repetir-senha').val();
        if (username && senha && senhaRepeat) {
            if (senha === senhaRepeat) {
                CadastrarUser(username, senha);
                window.location.href = 'dashboard.html'
            } else {
                // As senhas precisam ser iguais.
            }
        }
    });
    
    $('#btn-logar').click((e) => {
        e.preventDefault();
        let username = $('#login-username').val();
        let senha = $('#login-senha').val();
        LogarUser(username, senha);
    })

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
            alert('Ei, o que você está fazendo aqui?, você não está logado!')
        }
    })
})

// Functions

function CadastrarUser (username, senha) {
    if (!getItem(username)) {
        let newUser = new User(username, senha);
        setJsonItem(newUser.Username, newUser);
        setItem('userLogado', newUser.Username);
    } else {
        alert('Username já existe! Tente novamente.');
    }
}

function LogarUser (username, senha) {
    let user = getJsonItem(username);
    if (user.Senha === senha) {
        setItem('userLogado', user.Username);
        window.location.href = 'dashboard.html';
        alert('Logado com sucesso!');
    } else {
        alert('Usuário ou senha incorretos');
    }
}

function DeslogarUser () {
    removeItem('userLogado');
}

function ListaVIPs () {
    let user = getJsonItem(getItem('userLogado'));
    user.ContatosVIP.forEach(vip => {
        let element = `<div><p>${vip.Nome}</p></div>`
        $('#container').html(element);
    });;
}

function LimpaCampos () {

}







