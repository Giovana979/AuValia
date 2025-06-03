document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const resultCards = document.querySelectorAll(".result-card");

  // Função para realizar a pesquisa
  const performSearch = () => {
    const query = searchInput.value.toLowerCase();
    resultCards.forEach(card => {
      const title = card.querySelector(".result-title").textContent.toLowerCase();
      const address = card.querySelector(".result-address").textContent.toLowerCase();
      if (title.includes(query) || address.includes(query)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  };

  // Acionar pesquisa ao pressionar Enter
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  });

  // Acionar pesquisa ao clicar no botão
  searchButton.addEventListener("click", performSearch);

  // Função para aplicar filtros
  const filterInputs = document.querySelectorAll(".filter-group input");
  filterInputs.forEach(input => {
    input.addEventListener("change", () => {
      const activeFilters = Array.from(filterInputs)
        .filter(input => input.checked)
        .map(input => input.nextSibling.textContent.trim().toLowerCase());

      resultCards.forEach(card => {
        const services = card.querySelector(".result-title").textContent.toLowerCase();
        if (activeFilters.some(filter => services.includes(filter))) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});