const dictionaryDefinition = document.querySelector(".definition-details");
const wordInfoContainer = document.querySelector(".dictionary-response");
const audio = document.querySelector(".audio-element");
const playButton = document.querySelector(".play-audio-button");

playButton.style.display = "none";

function createBasicElement(tag, className, textContent) {
  const header = document.createElement(tag);
  header.className = className;
  header.textContent = textContent;
  return header;
}

function createAncla(source, className) {
  const ancla = document.createElement("a");
  ancla.href = source;
  ancla.setAttribute("target", "_blank");
  ancla.className = className;
  ancla.textContent = source;
  return ancla;
}

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

function handlePhonetics(phonetics) {
  const pronunciation = phonetics?.[0]?.text || phonetics?.[1]?.text || phonetics?.[2]?.text;
  const audioSrc = phonetics?.[0]?.audio || phonetics?.[1]?.audio || phonetics?.[2]?.audio;
  if (pronunciation) {
    dictionaryDefinition.appendChild(createBasicElement("h2", "pronunciation", pronunciation));
  }
  playButton.style.display = audioSrc ? "block" : "none";
  if (audioSrc) {
    audio.setAttribute("src", audioSrc);
  }
}

function handleMeanings(meanings) {
  if (meanings.length > 0) {
    meanings.forEach((meaning) => {
      const nounInfo = document.createElement("div");
      nounInfo.appendChild(
        createBasicElement("h2", "category-title", meaning.partOfSpeech)
      );
      nounInfo.appendChild(
        createBasicElement("h3", "category-subtitle", "Meaning")
      );
      const listDefinition = createList(meaning.definitions, "category-list");
      nounInfo.appendChild(listDefinition);

      const handleSynonymsOrAntonyms = (items, className, title) => {
        if (items.length > 0) {
          nounInfo.appendChild(createSynonymContainer(items, className, title));
        }
      };
      handleSynonymsOrAntonyms(meaning.synonyms, "list-synonyms", "Synonyms");
      handleSynonymsOrAntonyms(meaning.antonyms, "list-synonyms", "Antonyms");
      wordInfoContainer.appendChild(nounInfo);
    });
  }
}

function handleSources(sources) {
  if (sources.length > 0) {
    const footer = document.createElement("footer");
    const titleFooter = createBasicElement("h3", "source", "Source:");
    footer.appendChild(titleFooter);
    const listSource = document.createElement("ul");
    sources.forEach((source) => {
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

export function displayData(data) {
  if (!data || typeof data !== "object" || data.title) {
    dictionaryDefinition.innerHTML = "";
    playButton.style.display = "none";
    wordInfoContainer.innerHTML = "";
    const section = document.createElement("section");
    section.className = "error";
    section.appendChild(createBasicElement("h2", "", data.title));
    section.appendChild(createBasicElement("p", "", `${data.message} ${data.resolution}`));
    wordInfoContainer.appendChild(section);
    return;
  }

  dictionaryDefinition.innerHTML = "";
  wordInfoContainer.innerHTML = "";

  if (data?.[0]) {
    dictionaryDefinition.appendChild(
      createBasicElement("h1", "word", data[0].word)
    );

    handlePhonetics(data[0].phonetics);
    handleMeanings(data[0].meanings);
    handleSources(data[0].sourceUrls);
  }
}

playButton.addEventListener("click", () => {
  audio.volume = 0.9;
  audio.play();
});
