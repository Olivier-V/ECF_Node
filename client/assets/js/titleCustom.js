//Affichage du post-it personnalisé
export let user = sessionStorage.getItem("user");
document.querySelector("#txtAccueil").innerHTML = '<p>Bienvenue '+user+'<p>';