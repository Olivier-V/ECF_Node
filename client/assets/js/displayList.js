//Module permettant l'affichage de l'ensemble des membres

let myHeader = new Headers();
let url = '/liste';
let options = {
  method: 'GET',
  header: myHeader,
  mode: 'cors',
  cache: 'default'
};
let containerListe = document.querySelector('#liste');
let length;
var listePage;


fetch(url, options)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((response) => {
    listePage = response;
    length = (response.length + 1);
    response.forEach(elt => {
      let personne = document.createElement('form');
      personne.classList.add('cardPerson');
      personne.innerHTML = '<form id="formulairePersonne"></form>'
      let nom = document.createElement('h2');
      let statut = document.createElement('p');
      statut.innerHTML = '<p id="statut' + elt.id + '"></p>'
      nom.innerHTML = '<span  id="nomPersonne' + elt.id + '">' + elt.name + '</span><span id="prenomPersonne' + elt.id + '">' + elt.firstName + '</span>';
      let btnModif = document.createElement('span');
      btnModif.innerHTML = '<a href="#form2"><button id="btnModif' + elt.id + '" value=' + elt.id + '>Modifier/Supprimer</button></a>'; 

      if (elt.adherent) {
        personne.style.backgroundColor = 'gold';
        statut.innerText = 'Adherent'
      } else {
        personne.style.backgroundColor = 'lightgrey';
        statut.innerText = 'Non Adherent'
      }

      containerListe.appendChild(personne);
      personne.appendChild(nom);
      personne.appendChild(statut);
      personne.appendChild(btnModif);
    });
  });
