$(document).ready(()=>{
    
    $('#btn-login').click((e)=>{
        e.preventDefault();
        $('#modalLogin').modal('toggle');
    })
    $('#btn-registro').click((e)=>{
        e.preventDefault();
        $('#modalRegistro').modal('toggle');
    })
    $('#entrar').click((e)=>{
        e.preventDefault();
        window.location.href="dashboard.html";
    }) 
});