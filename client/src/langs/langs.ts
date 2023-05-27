import langEn from "./langEn";
import langEs from "./langEs";
import Texts from "./Texts";

// los lenguajes disponibles
type Lang = "en" | "es";

// los textos de lenguajes disponibles
const LANGS:{ [key in Lang]: Texts } = {
    en: langEn,
    es: langEs
}
export type { Lang };
export { LANGS };