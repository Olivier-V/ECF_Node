//Pour modifier / supprimer un membre  

import {Person} from "./person.class.js";

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
    listePage = response;
  });

document.querySelector('#liste').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo(0, 0);
  document.querySelector("#form").style.display = 'none';
  let myId = Number(e.target.id.split('f')[1]);

  console.log(myId);

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
    if (confirm("Souhaitez vous vraiment supprimer cet élément?")) {
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
    } else {
      window.location.reload();
    }
  });


});