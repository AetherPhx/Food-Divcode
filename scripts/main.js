import "../styles/main.scss";
import { loadBurguersList } from "./burgersList.js";
import { setUpCart } from "./Cart.js";

(() => {
	document.addEventListener("DOMContentLoaded", () => {
		loadBurguersList();
		setUpCart();
	});
})();
