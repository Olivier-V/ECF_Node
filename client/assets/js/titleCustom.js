//Affichage du post-it personnalis√©
export let user = sessionStorage.getItem("user");
document.querySelector("#txtAccueil").innerHTML = '<p>Bienvenue '+user+'<p>';