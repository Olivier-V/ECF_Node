import {
  Person
} from "./person.class.js";

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
let user = sessionStorage.getItem("user");
//Affichage du titre personnalisé
console.log(user)
document.querySelector("#title").innerText = 'Bienvenue ' + user;

//Requete permettant l'affichage de l'ensemble des membres
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
      btnModif.innerHTML = '<a href="#form2"><button id="btnModif' + elt.id + '" value=' + elt.id + '>Modifier/Supprimer</button></a>'; //<input id="btnModif'+elt.id+'" type="button" value="Modifier/Supprimer"></input>

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

//Pour ajouter un membre

document.querySelector('#btnAjout').addEventListener('click', (e) => {
  e.preventDefault();
  let newName = document.querySelector('#nom').value;
  let newFirst = document.querySelector('#prenom').value;
  let newAdherent = document.querySelector('#adherent').checked;
  let newChallenger = new Person(
    length,
    newName,
    newFirst,
    newAdherent
);
console.log(newChallenger)
  let options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(newChallenger)
  }

  fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((response) => {
      window.location.reload();
    })
});

//Pour modifier / supprimer un membre  
document.querySelector('#liste').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo(0,0);
  document.querySelector("#form").style.display = 'none';
  let myId = Number(e.target.id.split('f')[1]);
  let nomAmodif = listePage[myId - 1].name;
  let prenomAmodif = listePage[myId - 1].firstName;
  let adherentAmodifier = listePage[myId - 1].adherent;

  document.querySelector("#form2").style.display = 'block';
  document.querySelector('#nom2').value = nomAmodif;
  document.querySelector('#prenom2').value = prenomAmodif;
  document.querySelector('#adherent2').checked = adherentAmodifier;

  //bouton de modification
  document.querySelector("#btnValid").addEventListener('click', (e) => {
    e.preventDefault();
    let newObject = new Person(
          myId,
          document.querySelector('#nom2').value,
          document.querySelector('#prenom2').value,
          document.querySelector('#adherent2').checked      
    );
    // let newObject = {
    //   id: myId,
    //   name: document.querySelector('#nom2').value,
    //   firstName: document.querySelector('#prenom2').value,
    //   adherent: document.querySelector('#adherent2').checked
    // }
    let opt = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(newObject)
    }
    fetch(url, opt)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((response) => {
        window.location.reload();
      })

  })

  //bouton de suppression
  document.querySelector("#btnDelete").addEventListener('click', (e) => {
    e.preventDefault();
    console.log("ca efface")
    let objToDel = {
      id: myId
    }
    let optDel = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(objToDel)
    }
    fetch(url, optDel)
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        }
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
  });

});