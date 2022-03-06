let myHeaders3 = new Headers();
let myHeaders4 = new Headers();
let url3 = 'http://api.openweathermap.org/data/2.5/weather?lat=49.11790&lon=6.17546&appid=a089f2a1dec44496e38245c19908329b';
let options3 = {
    method: 'GET',
    headers: myHeaders3,
}

fetch(url3,options3)
    .then((res) => {
        if(res.ok){
            return res.json();
        }
    })
    .then((res2) => {
        console.log(res2);
        let container =document.querySelector("#meteoMetz");
        let p = document.createElement("p");
        p.innerText = 'Aujourd\'hui à Metz: '+res2.weather[0].description;
        container.appendChild(p);
        let ico = document.querySelector("#icone");
        ico.src = 'http://openweathermap.org/img/wn/'+res2.weather[0].icon+'@2x.png';
    })