//Pour ajouter un membre
import { Person } from "./person.class.js";
let length;
let myHeader = new Headers();
let url = '/liste';
let options = {
  method: 'GET',
  header: myHeader,
  mode: 'cors',
  cache: 'default'
};
var listePage;
fetch(url, options)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((response) => {
    length = (response.length + 1);
    listePage = response;
  });

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