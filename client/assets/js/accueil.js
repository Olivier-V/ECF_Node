//script permettant de traiter les actions sur la page accueil.html

document.querySelector("#btnConnect").addEventListener('click', (e) =>{
    e.preventDefault();
    let inputConnect = document.querySelector("#inputConnect");

    if(inputConnect.value == null || inputConnect.value ==''){
        alert("Veuillez renseigner votre nom afin d'entrer dans l'application")
    }
    else{
        let user = inputConnect.value;
        sessionStorage.setItem("user",user);
        window.location.href='./pages/liste.html';
    }
});