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
			return acc + product.getTotalPrice();
		}, 0);

		const totalPriceHTML = document.querySelector(".header__cart-total-price");
		totalPriceHTML.textContent = `Total: $${this.totalPrice}`;
	},

	// Add Product
	addProduct(newProduct) {
		if (this.products.find((product) => product.id === newProduct.id)) {
			this.increseProduct(newProduct);
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

	// Create Example Burguers
	const burguers = [
		new Product(1, "Parrillera", 1),
		new Product(2, "Carnívora", 2),
		new Product(3, "Crispy", 3),
		new Product(4, "Doble Todo", 4),
	];
	burguers.forEach((burguer) => cart.addProduct(burguer));
	const superBurguer = new Product(5, "Combo 1", 5);

	// Create Cart
	cart.refreshCart();

	// Add Product to Cart
	document.querySelector(".hero__image").addEventListener("click", () => {
		cart.addProduct(superBurguer);
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
