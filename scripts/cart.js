class Product {
	constructor(id, name, price) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.quantity = 0;
	}

	addOne() {
		this.quantity++;
	}

	getTotalPrice() {
		return this.price * this.quantity;
	}

	getQuantity() {
		return this.quantity;
	}
}

const cart = {
	products: [],
	totalPrice: 0,

	refreshCart() {
		this.calcTotalPrice();
		this.updateCounter();
		this.handleCartStatus();
	},

	handleCartStatus() {
		const emptyCart = document.querySelector(".header__cart-empty");
		const cartContent = document.querySelector(".header__cart-wrapper");

		if (this.products.length === 0) {
			emptyCart.toggleAttribute("hidden", false);
			cartContent.toggleAttribute("hidden", true);
			return;
		}

		emptyCart.toggleAttribute("hidden", true);
		cartContent.toggleAttribute("hidden", false);
	},
	updateCounter() {
		const counter = document.querySelector(".header__cart-counter");
		const currentCount = this.products.reduce((acc, product) => {
			return acc + product.getQuantity();
		}, 0);
		counter.textContent = currentCount;
	},
	calcTotalPrice() {
		this.totalPrice = this.products.reduce((acc, product) => {
			const fullPrice = product.getTotalPrice();
			return acc + fullPrice;
		}, 0);

		const totalPriceHTML = document.querySelector(".header__cart-total-price");
		totalPriceHTML.textContent = `Total: $${this.totalPrice}`;
	},

	// Add Product
	addProduct(newProduct) {
		const existingProduct = this.products.find(
			(product) => product.id === newProduct.id
		);
		if (existingProduct) {
			this.increseProduct(existingProduct);
			this.refreshCart();
			return;
		}

		newProduct.quantity++;
		this.products.push(newProduct);
		this.printNewProduct(newProduct);
		this.refreshCart();
	},
	increseProduct(productToIncrease) {
		productToIncrease.addOne();
		document
			.getElementById(productToIncrease.id)
			.querySelector(".header__cart-item-quantity").textContent =
			productToIncrease.quantity;
	},
	printNewProduct(newProduct) {
		const list = document.querySelector(".header__cart-list");
		const { id, name, price, quantity } = newProduct;

		const item = document.createElement("li");
		item.id = id;
		item.classList.add("header__cart-item");
		item.innerHTML = `
		<div class="header__cart-item-data">
			<span class="header__cart-item-quantity">${quantity}</span>
	
			<h3 class="header__cart-item-name">${name}</h3>
	
			<p class="header__cart-item-price">$${price}</p>
		</div>

		<div class="header__cart-item-remove">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</div>
		`;

		list.appendChild(item);
	},

	// Remove Product
	removeProductById(idToRemove) {
		const prodToRemove = this.products.find(
			(product) => product.id === idToRemove
		);
		prodToRemove.quantity = 0;

		this.products = this.products.filter(
			(product) => product.id !== idToRemove
		);

		const list = document.querySelector(".header__cart-list");
		list.removeChild(document.getElementById(idToRemove));

		this.refreshCart();
	},
};

// Add Listeners
export function setUpCart() {
	// Prepare Cart Icon
	const cartIcon = document.querySelector(".header__cart-icon");
	cartIcon.addEventListener("click", toggleCartDropdown);

	// Create Cart
	cart.refreshCart();

	// Add Product to Cart
	document.querySelector(".burguers__list").addEventListener("click", (e) => {
		const { target } = e;
		if (target.classList.contains("burguers__item-add")) {
			const burguerItem = target.closest(".burguers__item");
			cart.addProduct(createBurguer(burguerItem));
		}
	});

	// Remove Product from Cart
	const cartList = document.querySelector(".header__cart-list");
	cartList.addEventListener("click", (e) => {
		if (e.target.closest(".header__cart-item-remove")) {
			const newTarget = Number(e.target.closest(".header__cart-item").id);
			cart.removeProductById(newTarget);
		}
	});
}

// DropDown
function toggleCartDropdown() {
	const cartDropdownHTML = document.querySelector(".header__cart-dropdown");
	cartDropdownHTML.getAttribute("hidden") === ""
		? showCartDropdown(cartDropdownHTML)
		: hideCartDropdown(cartDropdownHTML);
}
function showCartDropdown(cart) {
	cart.toggleAttribute("hidden", false);
}
function hideCartDropdown(cart) {
	cart.toggleAttribute("hidden", true);
}

function createBurguer(burguerToCreate) {
	const formatPrice = (priceUnformatted) =>
		Number(priceUnformatted.replace("$ ", ""));

	const id = Number(burguerToCreate.id);
	const name = burguerToCreate.querySelector(
		".burguers__item-name"
	).textContent;
	const price = formatPrice(
		burguerToCreate.querySelector(".burguers__item-price").textContent
	);

	return new Product(id, name, price);
}
