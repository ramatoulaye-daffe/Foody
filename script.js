
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