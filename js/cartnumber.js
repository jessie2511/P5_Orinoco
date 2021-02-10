//pour afficher le nombre de produits panier dans le menu nav
function cartNumber() {
  const panier = JSON.parse(localStorage.getItem("panier"));

  if (panier) {
    let inCart = 0;
    panier.forEach(() => {
      inCart = inCart + 1;
    });
    localStorage.setItem("inCart", inCart);
    document.getElementById("cart_number").textContent = inCart;
  }
}
