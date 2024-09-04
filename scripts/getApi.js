const url = "https://api.dictionaryapi.dev/api/v2/entries/en";

export async function getApi(value) {
  try {
    const res = await fetch(`${url}/${value || "hello"}`);
    if (!res.ok) {
      throw new Error("Error en la petición: " + res.statusText);
    }
    return await res.json();
  } catch (error) {
    console.error("Error al realizar la petición:", error);
    return [];
  }
}
