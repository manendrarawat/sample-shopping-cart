export function addProductsToCart(products) {
	return {
		type: 'ADD_PRODUCT_TO_CART',
		payload: {
			products
		}
	};
}

export function removeProductFromCart(products) {
	return {
		type: 'REMOVE_PRODUCT_FROM_CART',
		payload: {
			products
		}
	};
}
