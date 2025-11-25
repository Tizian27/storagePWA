const saved = localStorage.getItem("lagerartikel");
let articles = saved ? JSON.parse(saved) : [];

const addButton = document.getElementById("btn-add");
const removeButton = document.getElementById("btn-remove");
const generateButton = document.getElementById("btn-generate");

const inputName = document.getElementById("input-name");
const inputQty = document.getElementById("input-qty");

const articleList = document.getElementById("article-list");

function renderArticles() {
  articleList.innerHTML = "";

  articles.forEach((article, index) => {
    if (article.qty > 0){
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${article.name} (Menge: ${article.qty})`;
    articleList.appendChild(li);
  }
  });
}

addButton.addEventListener("click", () => {
  const name = inputName.value.trim();
  const qty = Number(inputQty.value);

  if (!name || qty <= 0) {
    alert("Bitte Produktname und Menge eingeben");
    return;
  }

  const newArticle = { name, qty };

  articles.push(newArticle);
  console.log("Artikel hinzugefügt:", newArticle);
  saveArticles();
  renderArticles();

  inputName.value = "";
  inputQty.value = "";
});

removeButton.addEventListener("click", () => {
    const name = inputName.value.trim();
    const qty = Number(inputQty.value);
    const element = returnElement(name);
    if(element !== undefined){
        if(element.qty-qty >= 0){
            element.qty-=qty
        }
    }
    saveArticles();
    renderArticles();

  inputName.value = "";
  inputQty.value = "";
});

generateButton.addEventListener("click", () => {
  const listText = generateList();

  // jsPDF aus dem UMD Namespace holen
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const lineHeight = 8;
  const marginLeft = 10;
  let cursorY = 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  // Titel
  doc.text("Aktueller Lagerbestand", marginLeft, 10);

  // Text in Zeilen aufsplitten, damit es nicht rechts rausläuft
  const lines = doc.splitTextToSize(listText, 180);

  lines.forEach(line => {
    if (cursorY > 280) {
      doc.addPage();
      cursorY = 20;
    }
    doc.text(line, marginLeft, cursorY);
    cursorY += lineHeight;
  });

  // Download starten
  doc.save("lagerbestand.pdf");
});


function returnElement(name){
    const element =  articles.find(obj => obj.name === name);
    return element
}

function generateList() {
  if (articles.length === 0) {
    return "Keine Artikel vorhanden";
  }

  let output = "Aktueller Bestand:\n\n";

  articles.forEach((article, index) => {
    output += `${index + 1}. ${article.name} – Menge: ${article.qty}\n`;
  });

  return output;
}

function saveArticles() {
  localStorage.setItem("lagerartikel", JSON.stringify(articles));
}


renderArticles();
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(err => {
    console.error("Service Worker Registrierung fehlgeschlagen", err);
  });
}

