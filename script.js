
const menuButton = document.querySelector('.menu-button');

const navigation = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
  menuButton.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll('.heart').forEach((button) => {
  button.addEventListener('click', () => button.classList.toggle('liked'));
});

document.querySelectorAll('.add').forEach((button) => {
  button.addEventListener('click', () => {
    button.textContent = '✓';
    setTimeout(() => { button.textContent = '+'; }, 1200);
  });
});

/*------menu--------*/ 
const categoryButtons = document.querySelectorAll(".category-btn");
const menuCards = document.querySelectorAll(".menu-card");

    categoryButtons.forEach(button => {
      button.addEventListener("click", () => {

        // Récupérer la catégorie choisie
        const category = button.dataset.category;

        // Modifier le bouton actif
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");
          
          menuCards.forEach(card => {
            const cardCategory = card.dataset.category;

            if (category === "tous" || cardCategory === category) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
          });
      });
    });


/*-----ajouter un produit et passer au commande*/

const boutonsCommander = document.querySelectorAll(".menu-card .btn, .duo-card .duo-button");

boutonsCommander.forEach((bouton) => {
    bouton.addEventListener("click", (event) => {
        event.preventDefault();

        const carte = bouton.closest(".menu-card, .duo-card");

        const nom = carte.querySelector("h3").textContent.trim();
        const prixTexte = carte.querySelector("strong").textContent;
        const prix = Number(prixTexte.replace(/\D/g, ""));
        const image = carte.querySelector("img").getAttribute("src");

        let panier = JSON.parse(localStorage.getItem("panierFoody")) || [];

        const produitExiste = panier.find((produit) => produit.nom === nom);

        if (produitExiste) {
            produitExiste.quantite += 1;
        } else {
            panier.push({
                nom: nom,
                prix: prix,
                image: image,
                quantite: 1
            });
        }

        localStorage.setItem("panierFoody", JSON.stringify(panier));

        window.location.href = "commande.html";
    });
});

/*----afficher le produit selectionne------*/
const panierProduits = document.getElementById("panier-produits");

if (panierProduits) {
    const panier = JSON.parse(localStorage.getItem("panierFoody")) || [];

    if (panier.length === 0) {
        panierProduits.innerHTML = `
            <p class="panier-vide">
                Votre panier est vide.
                <a href="menu.html">Voir le menu</a>
            </p>
        `;
    } else {
        let total = 0;

        panierProduits.innerHTML = panier.map((produit) => {
            total += produit.prix * produit.quantite;

            return `
                <div class="summary-item">
                    <img src="${produit.image}" alt="${produit.nom}">

                    <div>
                        <h3>${produit.nom}</h3>
                        <p>Quantité : ${produit.quantite}</p>
                    </div>

                    <strong>
                        ${(produit.prix * produit.quantite).toLocaleString("fr-FR")} FCFA
                    </strong>
                </div>
            `;
        }).join("");

        panierProduits.innerHTML += `
            <div class="total-panier">
                Total : <strong>${total.toLocaleString("fr-FR")} FCFA</strong>
            </div>
        `;
    }
}