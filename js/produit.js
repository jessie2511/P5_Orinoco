//Appel URL + API + fonctions pour afficher le produit
function ajoutContent () {
  let id = new URL(window.location).searchParams.get('id')
fetch(`${"https://oc-p5-api.herokuapp.com/api/cameras"}/${id}`)
    .then(response => response.json()).then (data => {
      
        article = data
        ajoutHTML()
        ajoutLenses()
        console.log(article);        
    })
}
//Ajout lentilles pour chaque item renseignée dans l'API
function ajoutLenses() {
  for (let i = 0; i < article.lenses.length; i++) {
  document.getElementById("lense_select").innerHTML += `<option value="${article.lenses[i]}">${article.lenses[i]}</option>`
  }
}
// Présentation produit HTML
function ajoutHTML() {
  document.getElementById('focus_produit').innerHTML += 
  `
    <div class="affichage_produit">
      <img class=”image_produit” src="${article.imageUrl}"  alt="appareil ${article.name}">
      <h3 class="ml-4 mt-4">${article.name}</h3>
      <p class="description_produit ml-4">${article.description}</p>
      <p class="prix_produit mt-4 ml-4"><span>${article.price/100}€</span></p>
    </div>
  `
}
//Ajout produit au panier
function ajoutPanier() {
    let lentilles = document.querySelector('select').value; //Récupère la valeur de l'objectif choisi
    if (lentilles == "") { //si aucune lentille choisie, affichage message erreur
      swal("Oups!", "Vous devez choisir un objectif", "warning");
    } else {
        const panier = JSON.parse(localStorage.getItem("panier")) || [] //On extrait notre json ou on crée un tableau si le panier est vide
        panier.push({ //pour chaque article, on pousse les infos suivantes dans le panier
          image : article.imageUrl,
          name : article.name,
          id :article._id,
          lenses: lense_select.value,
          description : article.description,
          price : article.price/100,
          quantite : 1,
          subTotal : article.price/100*1
        })
        window.localStorage.setItem("panier", JSON.stringify(panier))
        //console.log(panier)
        console.log("Le produit a été ajouté au panier");
        showModal()
      }
}

//Affichage message pour confirmer ajout panier et rediriger vers panier ou page produits
function showModal() {
  document.getElementById("pop_up").innerHTML +=
        `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <button type="button" class="close text-right pr-2" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
              <div id="bg_modal" class="modal-body text-center">
                <div class="font-weight-bold mb-4">Super ! <br/>Vous avez ajouté <br/>un produit au panier</div>
              </div>
              <div class="modal-footer justify-content-center">
                <button id="bouton_modal1" type="button" class="btn btn-success"><a href="index.html">Continuer vos achats</a></button>
                <button id="bouton_modal2" type="button" class="btn btn-secondary"><a href="panier.html">Voir votre panier</a></button>
              </div>
            </div>
          </div>
        </div>`
}

ajoutContent();
cartNumber()
