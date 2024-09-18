import "../styles/main.scss";

const layout = document.querySelector(".layout");
const counterHTML = document.querySelector(".header__cart-counter-number");

(() => {
	document.addEventListener("DOMContentLoaded", () => {
		console.log(parseInt(counterHTML.textContent));
		layout.addEventListener("click", (e) => {
			let currentCounter = parseInt(counterHTML.textContent);
			if (e.target.classList.contains("burguers__item-add"))
				counterHTML.textContent = currentCounter + 1;

			if (e.target.classList.contains("header__cart-item-remove"))
				if (currentCounter > 0) counterHTML.textContent = currentCounter - 1;
		});
	});
})();
