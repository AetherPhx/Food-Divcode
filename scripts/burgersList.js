import { AxiosError } from "axios";
import { requestAllBurguers } from "./burguerService.js";

async function getBurguerList() {
	try {
		const burguersList = await requestAllBurguers();
		if (!burguersList) throw new AxiosError();
		return burguersList;
	} catch (error) {
		console.error(`
		ERROR AL OBTENER LA LISTA DE HAMBURGUESAS
		${error.name}: ${error.message}
		`);
	}
}

function printBurguersList(burguersList) {
	if (burguersList.length === 0) {
		const loaderHTML = document.querySelector(".burguers__loader");
		loaderHTML.toggleAttribute("hidden", true);

		const noBurguersHTML = document.querySelector(".burguers__no-burguers");
		noBurguersHTML.toggleAttribute("hidden", false);

		return;
	}

	const burguersHTML = document.querySelector(".burguers__list");
	burguersHTML.innerHTML = "";
	burguersList.forEach((burguer) => {
		const { id, name, price, img } = burguer;

		const burguerItem = document.createElement("li");
		burguerItem.classList.add("burguers__item");
		burguerItem.id = id;

		const burguerImg = document.createElement("img");
		burguerImg.classList.add("burguers__item-img");
		burguerImg.src = img;
		burguerImg.alt = `Hamburguesa "${name}"`;
		burguerItem.appendChild(burguerImg);

		const burguerName = document.createElement("h3");
		burguerName.classList.add("burguers__item-name");
		burguerName.textContent = name;
		burguerItem.appendChild(burguerName);

		const burguerPrice = document.createElement("p");
		burguerPrice.classList.add("burguers__item-price");
		burguerPrice.textContent = `$ ${price}`;
		burguerItem.appendChild(burguerPrice);

		const burguerAdd = document.createElement("button");
		burguerAdd.classList.add("burguers__item-add");
		burguerAdd.textContent = "Añadir al carrito";
		burguerItem.appendChild(burguerAdd);

		burguersHTML.appendChild(burguerItem);
	});
}

export async function loadBurguersList() {
	const burguersList = await getBurguerList();
	!burguersList ? printBurguersList([]) : printBurguersList(burguersList);
}
