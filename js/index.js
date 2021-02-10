function getRequest(){

const fetchPromise = fetch("https://oc-p5-api.herokuapp.com/api/cameras");
const inputJS = document.getElementById("produits");

fetchPromise.then(response => {//on exécute la promesse
  return response.json(); // on récupère le résultat sous format json
})
.then((data => {
  data.forEach((item)  => { //pour chaque item récupéré de l'API, on crée une constante name, price_id etc..
    const { name, price, _id, description, imageUrl } = item;
            //puis on affiche ces informations sous forme HTML
            inputJS.innerHTML +=`
            <div class="container col-md-6 col-lg-4">
               <div class="affichage_produit mt-4 card bg-white">
                  <img class=”card-img-top” src="${imageUrl}"  alt="appareil ${name}">
                  <div class="card-body">
                     <h3 class="card-title">${name}</h3>
                     <span>${price/100}€</span></p>
                     <p class="card-text product-description">${description}</p>
                     <div class="text-center mt-4" ><a id="bouton" type="button" class="btn btn-secondary text-white" onclick="window.location.href = 'produit.html?id=${_id}'">En savoir plus</a></div>
                  </div>
               </div>
            </div>`
   })
}))

}
getRequest()
cartNumber()