document.addEventListener('DOMContentLoaded', function(){
    let linkfechar = document.querySelector('#link-fechar')
    linkfechar. addEventListener('click', function(){
        window.api.send('fechar-janela-sobre')
    })
})