class Products {
	constructor() {
		this.classNameActive = 'products_element__btn_active';
		this.labelAdd = 'Добавить в корзину';
		this.labelRemove = 'Удалить из корзины';
	}

	  handleSetLocationStorage(elem, id) {
        const { pushProduct, products } = localStorageUtil.putProducts(id);
        
        if (pushProduct) {
            elem.classList.add(this.classNameActive);
            elem.innerHTML = this.labelRemove;
        } else {
            elem.classList.remove(this.classNameActive);
            elem.innerHTML = this.labelAdd;
        }
    }

	 render() {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';

		CATALOG.forEach(({id, article, name, price, image, description, buy_price, buy_price_uah}) => {
		  let activeClass = '';
		  let activeText = '';

		  if (productsStore.indexOf(id) === -1) {
                activeText = this.labelAdd;
            } else {
                activeClass = ' '+this.classNameActive;
                activeText = this.labelRemove;
            }

		  htmlCatalog += `

		<li class="products_element">
			<img class="products_element__img" src="${image}" alt="net">
			<div class="products_element__article">${article}</div>
			<div class="products_element__name"><b>${name}</b></div>
			<span class="products_element__price">${price} грн</span>
			<div class="products_element__descr">${description}</div>
			<div class="products_element__buy_price"> В $: ${buy_price}</div>
			<div class="products_element__buy_price_uah"> Без наценки ${buy_price_uah} грн</div>
			<button class="products_element__btn${activeClass}" onclick="productsPage.handleSetLocationStorage(this, '${id}');">
                ${activeText}
            </button>
		</li>
	`	
	});

		const html = `
		<ul class="products_container">
			${htmlCatalog}
		</ul>
		`;

		ROOT_PRODUCTS.innerHTML = html;
	}

}
let input = document.querySelector('input').oninput = function(){
	let element = document.querySelectorAll('.products_element')
	let val = this.value.trim()
	console.log(val)

 	if (val != '') {
 	element.forEach(function(item) {
 	 if (item.innerText.toLowerCase().search(val) == -1) {
 	 	item.style.display = 'none';
 	 } else {
 	 	item.style.display = 'block';
 	 	item.style.maxWidth = '300px';
 	 }
 	})
 } else{
 	element.forEach(function(item) {
 		item.style.display = 'block';
 	})
 }
}

const productsPage = new Products();
productsPage.render();