// 数据存储
let products = [];
let cart = [];
let productIdCounter = 1;

// DOM元素
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
const cartTabBtn = document.getElementById('cartTabBtn');
const cartCount = document.getElementById('cartCount');
const productsContainer = document.getElementById('productsContainer');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const selectAllCheckbox = document.getElementById('selectAll');
const selectedItemsCount = document.getElementById('selectedItemsCount');
const totalPrice = document.getElementById('totalPrice');

// 添加商品表单元素
const prodNameInput = document.getElementById('prodName');
const prodPriceInput = document.getElementById('prodPrice');
const prodDescInput = document.getElementById('prodDesc');
const prodImgInput = document.getElementById('prodImg');
const addProdBtn = document.getElementById('addProdBtn');

// 初始化
function init() {
	// 绑定标签切换事件
	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			// 移除所有活动状态
			tabs.forEach(t => t.classList.remove('active'));
			panels.forEach(p => p.classList.remove('active'));
			
			// 添加当前活动状态
			tab.classList.add('active');
			const panelId = tab.getAttribute('data-panel');
			document.getElementById(panelId).classList.add('active');
		});
	});

	// 购物车按钮切换到购物车标签
	cartTabBtn.addEventListener('click', () => {
		tabs.forEach(t => t.classList.remove('active'));
		panels.forEach(p => p.classList.remove('active'));
		
		document.querySelector('.tab[data-panel="cart-panel"]').classList.add('active');
		document.getElementById('cart-panel').classList.add('active');
	});

	// 添加商品按钮事件
	addProdBtn.addEventListener('click', addNewProduct);

	// 全选复选框事件
	selectAllCheckbox.addEventListener('change', handleSelectAll);

	// 初始加载一些示例商品
	loadSampleProducts();
}

// 加载示例商品
function loadSampleProducts() {
	// 添加示例商品1
	const sample1 = {
		id: productIdCounter++,
		name: '新鲜水果礼盒',
		price: 89.9,
		description: '精选当季新鲜水果组合，包含苹果、橙子、草莓等',
		image: 'https://picsum.photos/400/300?random=10'
	};
	products.push(sample1);

	// 添加示例商品2
	const sample2 = {
		id: productIdCounter++,
		name: '无线蓝牙耳机',
		price: 199.00,
		description: '高音质无线蓝牙耳机，续航长达24小时',
		image: 'https://picsum.photos/400/300?random=20'
	};
	products.push(sample2);

	// 渲染商品列表
	renderProducts();
}

// 添加新商品
function addNewProduct() {
	const name = prodNameInput.value.trim();
	const price = parseFloat(prodPriceInput.value);
	const description = prodDescInput.value.trim();
	const imageFile = prodImgInput.files[0];

	// 验证输入
	if (!name || isNaN(price) || price <= 0) {
		alert('请输入有效的商品名称和单价');
		return;
	}

	// 创建新商品对象
	const newProduct = {
		id: productIdCounter++,
		name: name,
		price: price,
		description: description || '无描述',
		image: ''
	};

	// 处理图片
	if (imageFile) {
		const reader = new FileReader();
		reader.onload = function(e) {
			newProduct.image = e.target.result;
			products.push(newProduct);
			renderProducts();
			clearProductForm();
		};
		reader.readAsDataURL(imageFile);
	} else {
		// 使用默认图片
		newProduct.image = `https://picsum.photos/400/300?random=${productIdCounter}`;
		products.push(newProduct);
		renderProducts();
		clearProductForm();
	}
}

// 清空商品表单
function clearProductForm() {
	prodNameInput.value = '';
	prodPriceInput.value = '';
	prodDescInput.value = '';
	prodImgInput.value = '';
}

// 渲染商品列表
function renderProducts() {
	productsContainer.innerHTML = '';

	products.forEach(product => {
		const productCard = document.createElement('div');
		productCard.className = 'product-card';
		productCard.innerHTML = `
			<img src="${product.image}" alt="${product.name}" class="product-img">
			<div class="product-info">
				<h3 class="product-name">${product.name}</h3>
				<p class="product-price">¥${product.price.toFixed(2)}</p>
				<p class="product-desc">${product.description}</p>
				<button class="btn-cart" data-id="${product.id}">加入购物车</button>
			</div>
		`;
		productsContainer.appendChild(productCard);
	});

	// 绑定加入购物车按钮事件
	document.querySelectorAll('.btn-cart').forEach(btn => {
		btn.addEventListener('click', addToCart);
	});
}

// 添加商品到购物车
function addToCart(event) {
	const productId = parseInt(event.target.getAttribute('data-id'));
	const product = products.find(p => p.id === productId);

	if (product) {
		// 检查商品是否已在购物车中
		const cartItem = cart.find(item => item.product.id === productId);
		
		if (cartItem) {
			// 如果已在购物车中，增加数量
			cartItem.quantity += 1;
		} else {
			// 如果不在购物车中，添加新项
			cart.push({
				product: product,
				quantity: 1,
				selected: true // 默认选中
			});
		}

		// 更新购物车显示
		updateCart();
		
		// 添加成功提示
		showToast(`已将"${product.name}"添加到购物车`);
	}
}
// 显示提示消息
function showToast(message) {
	const toast = document.createElement('div');
	toast.textContent = message;
	toast.style.position = 'fixed';
	toast.style.top = '20px';
	toast.style.right = '20px';
	toast.style.backgroundColor = '#333';
	toast.style.color = 'white';
	toast.style.padding = '10px 20px';
	toast.style.borderRadius = '5px';
	toast.style.zIndex = '100';
	document.body.appendChild(toast);
	
	setTimeout(() => {
		toast.style.opacity = '0';
		toast.style.transition = 'opacity 0.5s';
		setTimeout(() => {
			document.body.removeChild(toast);
		}, 500);
	}, 2000);
}

// 更新购物车显示
function updateCart() {
	// 更新购物车计数
	const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
	cartCount.textContent = totalItems;

	// 渲染购物车项目
	renderCartItems();

	// 更新购物车统计信息
	updateCartSummary();
}

// 渲染购物车项目
function renderCartItems() {
	cartItemsContainer.innerHTML = '';

	if (cart.length === 0) {
		// 购物车为空
		cartItemsContainer.innerHTML = `
			<tr>
				<td colspan="6" class="empty-cart">
					<i class="fas fa-shopping-cart"></i>
					购物车是空的
				</td>
			</tr>
		`;
		return;
	}

	// 渲染购物车中的商品
	cart.forEach((item, index) => {
		const cartItem = document.createElement('tr');
		cartItem.innerHTML = `
			<td>
				<input type="checkbox" class="item-checkbox" data-index="${index}" ${item.selected ? 'checked' : ''}>
			</td>
			<td>
				<div class="cart-item">
					<img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img">
					<div class="cart-item-info">
						<div class="cart-item-name">${item.product.name}</div>
						<div class="cart-item-desc">${item.product.description}</div>
					</div>
				</div>
			</td>
			<td>¥${item.product.price.toFixed(2)}</td>
			<td>
				<div class="quantity-control">
					<button class="qty-btn minus" data-index="${index}">-</button>
					<input type="number" class="qty-input" value="${item.quantity}" min="1" data-index="${index}">
					<button class="qty-btn plus" data-index="${index}">+</button>
				</div>
			</td>
			<td class="item-subtotal">¥${(item.product.price * item.quantity).toFixed(2)}</td>
			<td>
				<button class="btn-delete" data-index="${index}">删除</button>
			</td>
		`;
		cartItemsContainer.appendChild(cartItem);
	});

	// 绑定购物车项目事件
	bindCartItemEvents();
}

// 绑定购物车项目事件
function bindCartItemEvents() {
	// 复选框事件
	document.querySelectorAll('.item-checkbox').forEach(checkbox => {
		checkbox.addEventListener('change', handleItemSelection);
	});

	// 数量减少按钮事件
	document.querySelectorAll('.qty-btn.minus').forEach(btn => {
		btn.addEventListener('click', decreaseQuantity);
	});

	// 数量增加按钮事件
	document.querySelectorAll('.qty-btn.plus').forEach(btn => {
		btn.addEventListener('click', increaseQuantity);
	});

	// 数量输入框事件
	document.querySelectorAll('.qty-input').forEach(input => {
		input.addEventListener('change', updateQuantity);
		input.addEventListener('keypress', function(e) {
			if (e.key === 'Enter') {
				this.blur();
			}
		});
	});

	// 删除按钮事件
	document.querySelectorAll('.btn-delete').forEach(btn => {
		btn.addEventListener('click', deleteCartItem);
	});
}

// 处理商品选择
function handleItemSelection(event) {
	const index = parseInt(event.target.getAttribute('data-index'));
	cart[index].selected = event.target.checked;
	
	// 更新全选状态
	updateSelectAllStatus();
	
	// 更新购物车统计信息
	updateCartSummary();
}

// 处理全选/取消全选
function handleSelectAll() {
	const isChecked = selectAllCheckbox.checked;
	
	// 更新所有商品的选择状态
	cart.forEach(item => {
		item.selected = isChecked;
	});
	
	// 重新渲染购物车项目
	renderCartItems();
	
	// 更新购物车统计信息
	updateCartSummary();
}

// 更新全选按钮状态
function updateSelectAllStatus() {
	const allSelected = cart.every(item => item.selected);
	selectAllCheckbox.checked = allSelected;
}

// 减少商品数量
function decreaseQuantity(event) {
	const index = parseInt(event.target.getAttribute('data-index'));
	
	if (cart[index].quantity > 1) {
		cart[index].quantity -= 1;
	} else {
		// 如果数量为1，减少则删除商品
		cart.splice(index, 1);
	}
	
	// 更新购物车
	updateCart();
}

// 增加商品数量
function increaseQuantity(event) {
	const index = parseInt(event.target.getAttribute('data-index'));
	cart[index].quantity += 1;
	
	// 更新购物车
	updateCart();
}

// 更新商品数量
function updateQuantity(event) {
	const index = parseInt(event.target.getAttribute('data-index'));
	let newQuantity = parseInt(event.target.value);
	
	// 确保数量至少为1
	if (isNaN(newQuantity) || newQuantity < 1) {
		newQuantity = 1;
		event.target.value = newQuantity;
	}
	
	cart[index].quantity = newQuantity;
	
	// 更新购物车
	updateCart();
}

// 删除购物车商品
function deleteCartItem(event) {
	if (confirm('确定要删除此商品吗？')) {
		const index = parseInt(event.target.getAttribute('data-index'));
		cart.splice(index, 1);
		
		// 更新购物车
		updateCart();
	}
}

// 更新购物车统计信息
function updateCartSummary() {
	// 计算选中的商品数量
	const selectedItems = cart.filter(item => item.selected);
	const selectedCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
	
	// 计算选中商品的总价
	const total = selectedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
	
	// 更新显示
	selectedItemsCount.textContent = selectedCount;
	totalPrice.textContent = total.toFixed(2);
}

// 初始化应用
document.addEventListener('DOMContentLoaded', init);
