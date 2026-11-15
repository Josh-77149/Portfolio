import { $ } from "./utils.js";
import { loadFilms } from "./films.js";
import { loadArticles } from "./articles.js";
import { setupContact } from "./contact.js";

$("#year").textContent = new Date().getFullYear();

setupContact();
loadFilms();
loadArticles();
