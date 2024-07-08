document.addEventListener('DOMContentLoaded', function(){
    let linksobre= document.querySelector('#link-sobre')
    
linksobre.addEventListener('click', function(){
    window.api.send('abrir-link-sobre')
})


})