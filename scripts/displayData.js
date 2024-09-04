const entryInfo = document.querySelector(".entry-info");
const wordCategory = document.querySelector(".word-category");
const audio = document.querySelector(".audio");
const playButton = document.querySelector(".play-button");

playButton.style.display = "none";

// Función para crear elementos de encabezado
function createHeader(tag, className, textContent) {
  const header = document.createElement(tag);
  header.className = className;
  header.textContent = textContent;
  return header;
}

// Función para crear elementos ancor


// Función para crear una lista a partir de un array de elementos
function createList(items, className) {
  const list = document.createElement("ul");
  list.className = className;
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
  return list;
}

// Función para mostrar la información de fonética
function handlePhonetics(phonetics) {
  if (phonetics?.[2]) {
    entryInfo.appendChild(createHeader("h2", "pronunciation", phonetics[2].text));
    playButton.style.display = "block";
    audio.setAttribute("src", phonetics[2].audio);
  }
}

// Función para mostrar los significados
function handleMeanings(meanings) {
  if (meanings?.[0]) {
    wordCategory.appendChild(createHeader("h2", "category-title", "noun"));
    wordCategory.appendChild(createHeader("h3", "category-subtitle", "Meaning"));

    const listDefinition = createList(
      meanings[0].definitions.map(def => def.definition),
      "category-list"
    );
    wordCategory.appendChild(listDefinition);

    if (meanings[0].synonyms) {
      const synonims = document.createElement("div");
      synonims.className = "content-synonims";

      const subh3 = createHeader("h3", "category-subtitle", "Synonyms");
      synonims.appendChild(subh3);

      const listSynonyms = createList(meanings[0].synonyms, "list-synonyms");
      synonims.appendChild(listSynonyms);

      wordCategory.appendChild(synonims);
    }
  }

  if (meanings?.[1]?.definitions) {
    wordCategory.appendChild(createHeader("h2", "category-title", "verb"));
    wordCategory.appendChild(createHeader("h3", "category-subtitle", "Meaning"));

    const listMeaning = document.createElement("ul");
    listMeaning.className = "category-list";
    meanings[1].definitions.forEach(def => {
      const li = document.createElement("li");

      const h4 = createHeader("h4", "", def.definition);
      li.appendChild(h4);

      if (def.example) {
        const p = document.createElement("p");
        p.textContent = def.example;
        li.appendChild(p);
      }

      listMeaning.appendChild(li);
    });

    wordCategory.appendChild(listMeaning);
  }
}

// Función para mostrar las fuentes de la información
function handleSources(sources) {
  if (sources) {
    const footer = document.createElement("footer");
    const titleFooter = createHeader("h3", "", "Source");
    footer.appendChild(titleFooter);

    const listSource = createList(sources, "");
    footer.appendChild(listSource);

    wordCategory.appendChild(footer);
  }
}

// Función principal para mostrar los datos
export function displayData(data) {
  if (!data || !Array.isArray(data)) {
    console.error("Data is invalid or empty");
    return;
  }

  entryInfo.innerHTML = "";
  wordCategory.innerHTML = "";

  data.forEach(element => {
    entryInfo.appendChild(createHeader("h1", "word", element.word));

    handlePhonetics(element.phonetics);
    handleMeanings(element.meanings);
    handleSources(element.sourceUrls);
  });

  console.log(data);
}

// Evento para reproducir el audio
playButton.addEventListener("click", () => {
  audio.volume = 0.6;
  audio.play();
});
