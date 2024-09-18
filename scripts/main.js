import "../styles/main.scss";
import { loadBurguersList } from "./burgersList.js";

(() => {
	document.addEventListener("DOMContentLoaded", () => {
		loadBurguersList();
	});
})();
