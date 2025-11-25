// Einfaches Datenmodell im Speicher
const articles = [];

// Referenzen auf DOM Elemente holen
const addButton = document.getElementById("btn-add");
const removeButton = document.getElementById("btn-remove");
const generateButton = document.getElementById("btn-generate");
const articleList = document.getElementById("article-list");

// Funktion, um die Liste im HTML zu aktualisieren
function renderArticles() {
  // Liste erst leeren
  articleList.innerHTML = "";

  // Jeden Artikel aus dem Array als <li> hinzufügen
  articles.forEach((article, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${article.name} (Menge: ${article.qty})`;
    articleList.appendChild(li);
  });
}

// Beispiel Logik für "Artikel hinzufügen"
addButton.addEventListener("click", () => {
  // In echt würdest du später einen Dialog oder ein Formular nutzen.
  // Für den Anfang hart codieren wir einen Testartikel.
  const newArticle = {
    name: "Testartikel",
    qty: 1
  };

  articles.push(newArticle);
  console.log("Artikel hinzugefügt:", newArticle);

  // Oberfläche aktualisieren
  renderArticles();
});

// Platzhalter Logik für die anderen Buttons
removeButton.addEventListener("click", () => {
  console.log("Artikel entnehmen geklickt");
  // Hier später: Logik zum Reduzieren von Menge oder Entfernen
});

generateButton.addEventListener("click", () => {
  console.log("Liste generieren geklickt");
  // Hier später: PDF Logik
});

// Erstes Rendering (am Anfang ist die Liste leer)
renderArticles();
