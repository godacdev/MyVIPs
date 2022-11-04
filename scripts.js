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
    
    $("#fechaLogin").click((e)=>{
        $("#modal-container").hide();
        window.location.href="index.html";
    })
    
    $("#fecharegistro").click((e)=>{
        $("#modal-container").hide();
        window.location.href="index.html";
    })

});