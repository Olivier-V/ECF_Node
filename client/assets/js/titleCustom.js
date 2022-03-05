//Affichage du titre personnalisé
export let user = sessionStorage.getItem("user");
document.querySelector("#title").innerText = 'Bienvenue ' + user;