const entryInfo = document.querySelector(".entry-info");
const wordInfoContainer = document.querySelector(".word-info-container");
const audio = document.querySelector(".audio");
const playButton = document.querySelector(".play-button");

playButton.style.display = "none";

// Función para crear elementos de encabezado
function createBasicElement(tag, className, textContent) {
  const header = document.createElement(tag);
  header.className = className;
  header.textContent = textContent;
  return header;
}

// Función para crear elementos ancla
function createAncla(source, className) {
  const ancla = document.createElement("a");
  ancla.href = source;
  ancla.setAttribute("target", "_blank");
  ancla.className = className;
  ancla.textContent = source;
  return ancla;
}

// Función para crear una lista a partir de un array de elementos
function createList(items, className) {
  const list = document.createElement("ul");
  list.className = className;
  items.forEach((item) => {
    const li = document.createElement("li");
    const p = createBasicElement("p", "", item.definition);
    const span = document.createElement("span");
    span.textContent = item.example ? `"${item.example}"` : "";
    li.appendChild(p);
    li.appendChild(span);
    list.appendChild(li);
  });
  return list;
}

// Función para crear una lista de sinonimos o antonimos a partir de un array de elementos
function createSynonymContainer(item, className, h3title) {
  const synonims = document.createElement("div");
  synonims.className = "WordRelationsContainer";
  const subh3 = createBasicElement("h3", "category-subtitle", h3title);
  synonims.appendChild(subh3);
  const listSynonyms = document.createElement("ul");
  listSynonyms.className = className;
  item.map((synonyms) => {
    const li = document.createElement("li");
    li.textContent = synonyms;
    listSynonyms.appendChild(li);
    synonims.appendChild(listSynonyms);
  });
  return synonims;
}

// Función para mostrar la información de fonética
function handlePhonetics(phonetics) {
  const pronunciation =
    phonetics?.[0]?.text || phonetics?.[1]?.text || phonetics?.[2]?.text;
  const audioSrc =
    phonetics?.[0]?.audio || phonetics?.[1]?.audio || phonetics?.[2]?.audio;
  if (pronunciation) {
    entryInfo.appendChild(
      createBasicElement("h2", "pronunciation", pronunciation)
    );
  }
  playButton.style.display = audioSrc ? "block" : "none";
  if (audioSrc) {
    audio.setAttribute("src", audioSrc);
  }
}

// Función para mostrar los significados
function handleMeanings(meanings) {
  if (meanings?.[0]) {
    const nounInfo = document.createElement("div");
    nounInfo.appendChild(
      createBasicElement("h2", "category-title", meanings[0].partOfSpeech)
    );
    nounInfo.appendChild(
      createBasicElement("h3", "category-subtitle", "Meaning")
    );
    const listDefinition = createList(meanings[0].definitions, "category-list");
    nounInfo.appendChild(listDefinition);
    if (meanings[0].synonyms.length > 0) {
      nounInfo.appendChild(
        createSynonymContainer(
          meanings[0].synonyms,
          "list-synonyms",
          "Synonyms"
        )
      );
    }
    if (meanings[0].antonyms.length > 0) {
      nounInfo.appendChild(
        createSynonymContainer(
          meanings[0].antonyms,
          "list-synonyms",
          "Antonyms"
        )
      );
    }
    wordInfoContainer.appendChild(nounInfo);
  }

  if (meanings?.[1]?.definitions) {
    const verbInfo = document.createElement("div");
    verbInfo.appendChild(
      createBasicElement("h2", "category-title", meanings[1].partOfSpeech)
    );
    verbInfo.appendChild(
      createBasicElement("h3", "category-subtitle", "Meaning")
    );
    const listDefinition = createList(meanings[1].definitions, "category-list");
    verbInfo.appendChild(listDefinition);

    if (meanings[1].synonyms.length > 0) {
      verbInfo.appendChild(
        createSynonymContainer(
          meanings[1].synonyms,
          "list-synonyms",
          "Synonyms"
        )
      );
    }
    if (meanings[1].antonyms.length > 0) {
      verbInfo.appendChild(
        createSynonymContainer(
          meanings[1].antonyms,
          "list-synonyms",
          "Antonyms"
        )
      );
    }
    wordInfoContainer.appendChild(verbInfo);
  }

  if (meanings?.[2]?.definitions) {
    const adjInterjInfo = document.createElement("div");
    adjInterjInfo.appendChild(
      createBasicElement("h2", "category-title", meanings[2].partOfSpeech)
    );
    adjInterjInfo.appendChild(
      createBasicElement("h3", "category-subtitle", "Meaning")
    );
    const listDefinition = createList(meanings[2].definitions, "category-list");
    adjInterjInfo.appendChild(listDefinition);
    if (meanings[2].synonyms.length > 0) {
      adjInterjInfo.appendChild(
        createSynonymContainer(
          meanings[2].synonyms,
          "list-synonyms",
          "Synonyms"
        )
      );
    }
    if (meanings[2].antonyms.length > 0) {
      adjInterjInfo.appendChild(
        createSynonymContainer(
          meanings[2].antonyms,
          "list-synonyms",
          "Antonyms"
        )
      );
    }
    wordInfoContainer.appendChild(adjInterjInfo);
  }
}

// Función para mostrar las fuentes de la información
function handleSources(sources) {
  if (sources) {
    const footer = document.createElement("footer");
    const titleFooter = createBasicElement("h3", "source", "Source:");
    footer.appendChild(titleFooter);
    const listSource = document.createElement("ul");
    sources.map((source) => {
      const li = document.createElement("li");
      const ancla = createAncla(source, "");
      const img = document.createElement("img");
      img.src = "/assets/icon-new-window.svg";
      li.appendChild(ancla);
      ancla.appendChild(img);
      listSource.appendChild(li);
    });
    footer.appendChild(listSource);
    wordInfoContainer.appendChild(footer);
  }
}

// Función principal para mostrar los datos
export function displayData(data) {
  if (!data || !Array.isArray(data)) {
    entryInfo.innerHTML = "";
    playButton.style.display = "none";
    wordInfoContainer.innerHTML = "";
    const section = document.createElement("section");
    section.className = "error";
    section.appendChild(createBasicElement("h2", "", data.title));
    section.appendChild(
      createBasicElement("p", "", `${data.message} ${data.resolution}`)
    );
    wordInfoContainer.appendChild(section);
    return;
  }

  entryInfo.innerHTML = "";
  wordInfoContainer.innerHTML = "";

  if (data?.[0]) {
    entryInfo.appendChild(createBasicElement("h1", "word", data[0].word));

    handlePhonetics(data[0].phonetics);
    handleMeanings(data[0].meanings);
    handleSources(data[0].sourceUrls);
  }
}

// Evento para reproducir el audio
playButton.addEventListener("click", () => {
  audio.volume = 0.9;
  audio.play();
});
