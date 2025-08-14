<template>
	<div class="cart-container">
		<!-- 页面标题 -->
		<div class="page-header">
			<h1 class="page-title">
				<el-icon>
					<ShoppingCart />
				</el-icon>
				我的购物车
			</h1>
			<el-breadcrumb separator="/" class="breadcrumb">
				<el-breadcrumb-item>首页</el-breadcrumb-item>
				<el-breadcrumb-item>商品分类</el-breadcrumb-item>
				<el-breadcrumb-item>购物车</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<!-- 购物车卡片 -->
		<div class="cart-card">
			<!-- 空购物车状态 -->
			<div v-if="isEmptyCart" class="empty-cart">
				<ShoppingCart class="empty-icon" />
				<h3 class="empty-title">购物车是空的</h3>
				<p class="empty-desc">快去挑选心仪的商品吧~</p>
				<el-button type="primary" class="go-shopping">
					去购物
				</el-button>
			</div>

			<!-- 购物车商品列表 -->
			<div v-else class="cart-content">
				<!-- 列表头部 -->
				<div class="cart-header">
					<el-checkbox v-model="allChecked" class="select-all">
						全选
					</el-checkbox>
					<div class="header-cols">
						<div class="col-product">商品信息</div>
						<div class="col-price">单价</div>
						<div class="col-quantity">数量</div>
						<div class="col-subtotal">小计</div>
						<div class="col-action">操作</div>
					</div>
				</div>

				<!-- 商品列表 -->
				<div class="cart-items">
					<div class="cart-item" v-for="item in cart.cartItems" :key="item.id">
						<el-checkbox v-model="item.checked" class="item-checkbox"></el-checkbox>

						<div class="item-info">
							<img :src="item.imgUrl" alt="商品图片" class="item-img" />
							<div class="item-details">
								<h4 class="item-name">{{ item.name }}</h4>
								<div class="item-attrs">
									<span v-for="(attr, key) in item.attributes" :key="key">
										{{ key }}: {{ attr }}
									</span>
								</div>
							</div>
						</div>

						<div class="item-price">¥{{ item.price.toFixed(2) }}</div>

						<div class="item-quantity">
							<el-input-number v-model="item.productNum" :min="1" :max="99" class="quantity-input" />
						</div>

						<div class="item-subtotal">¥{{ (item.price * item.productNum).toFixed(2) }}</div>

						<div class="item-action">
							<el-button type="text" class="delete-btn">
								<Delete />
								<span>删除</span>
							</el-button>
						</div>
					</div>
				</div>

				<!-- 操作栏 -->
				<div class="cart-actions">
					<el-button type="text" class="batch-delete">
						<Delete />
						<span>删除选中商品</span>
					</el-button>

					<div class="cart-summary">
						<div class="summary-item">
							<span>已选 {{ selectedCount }} 件商品</span>
						</div>
						<div class="summary-item total-price">
							<span>合计：</span>
							<span class="price">¥100.00</span>
							<span class="tax">（含税费 ¥100.00）</span>
						</div>
						<el-button type="primary" class="checkout-btn">
							结算
						</el-button>
					</div>
				</div>
			</div>
		</div>

		<!-- 推荐商品 -->
		<div class="recommend-section">
			<h3 class="recommend-title">为您推荐</h3>
			<div class="recommend-products">
				<div class="recommend-item" v-for="(product, index) in recommendProducts" :key="index">
					<img :src="product.imgUrl" alt="推荐商品" class="recommend-img" />
					<h4 class="recommend-name">{{ product.name }}</h4>
					<div class="recommend-price">¥{{ product.price.toFixed(2) }}</div>
					<el-button type="primary" class="add-btn">
						加入购物车
					</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		onMounted,
		reactive,
	} from 'vue';


	// 推荐商品数据
	const recommendProducts = reactive([{
			id: 101,
			name: '便携式蓝牙音箱 重低音 防水设计',
			price: 399.00,
			imgUrl: 'https://picsum.photos/120/120?random=8'
		},
		{
			id: 102,
			name: '无线充电器 多设备兼容 快充',
			price: 129.00,
			imgUrl: 'https://picsum.photos/120/120?random=19'
		},
		{
			id: 103,
			name: '多功能料理机 榨汁搅拌 绞肉',
			price: 599.00,
			imgUrl: 'https://picsum.photos/120/120?random=21'
		},
		{
			id: 104,
			name: '智能空气净化器 除甲醛 静音设计',
			price: 1599.00,
			imgUrl: 'https://picsum.photos/120/120?random=20'
		}
	]);


	// 从后端获取相应的数据
	import axios from '@/axios';

	// 使用购物车数据的仓库
	import useCart from '@/store/cart.js'
	const cart = useCart();

	// 购物车组件挂载完成后，导入
	onMounted(async () => {
		// 从后端获取购物车相关数据
		let {
			data
		} = await axios.get("/usercart", {
			params: {
				username: "xiaozhang",
			}
		});

		// 将拿到的购物车的数据，保存在购物车中的效果
		cart.cartItems = data[0].order;
	})


	// 1完成购物车的添加行为，任何组件都可以通过按钮，添加商品到购物车中
	// 2完成购物车的保存行为，什么时候保存，如何保存
</script>

<style scoped>
	/* 基础样式 */
	.cart-container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 30px 20px;
		box-sizing: border-box;
		background-color: #f9fafb;
		min-height: 100vh;
	}

	/* 页面头部 */
	.page-header {
		margin-bottom: 30px;
	}

	.page-title {
		font-size: 24px;
		font-weight: 600;
		color: #409eff;
		margin-bottom: 10px;
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.breadcrumb {
		font-size: 14px;
		color: #666;
	}

	/* 购物车卡片 */
	.cart-card {
		background-color: #fff;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		padding: 20px;
		margin-bottom: 30px;
		transition: all 0.3s ease;
	}

	.cart-card:hover {
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
	}

	/* 空购物车样式 */
	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 60px 0;
		text-align: center;
	}

	.empty-icon {
		font-size: 64px;
		color: #c9cdD4;
		margin-bottom: 20px;
	}

	.empty-title {
		font-size: 18px;
		font-weight: 500;
		color: #333;
		margin-bottom: 10px;
	}

	.empty-desc {
		font-size: 14px;
		color: #999;
		margin-bottom: 30px;
	}

	.go-shopping {
		min-width: 140px;
		height: 44px;
		border-radius: 8px;
		background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
		border-color: transparent;
	}

	/* 购物车内容 */
	.cart-header {
		display: flex;
		align-items: center;
		padding: 15px 0;
		border-bottom: 1px solid #f0f0f0;
		margin-bottom: 15px;
	}

	.select-all {
		margin-right: 20px;
		color: #666;
	}

	.header-cols {
		display: flex;
		width: 100%;
	}

	.col-product {
		width: 45%;
	}

	.col-price,
	.col-quantity,
	.col-subtotal {
		width: 15%;
		text-align: center;
	}

	.col-action {
		width: 10%;
		text-align: center;
	}

	/* 商品列表 */
	.cart-items {
		margin-bottom: 20px;
	}

	.cart-item {
		display: flex;
		align-items: center;
		padding: 15px 0;
		border-bottom: 1px solid #f5f5f5;
		transition: background-color 0.2s;
	}

	.cart-item:hover {
		background-color: #fafafa;
	}

	.item-checkbox {
		margin-right: 20px;
	}

	.item-info {
		display: flex;
		width: 45%;
	}

	.item-img {
		width: 100px;
		height: 100px;
		object-fit: cover;
		border-radius: 8px;
		margin-right: 15px;
		border: 1px solid #f0f0f0;
	}

	.item-details {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.item-name {
		font-size: 16px;
		color: #333;
		margin-bottom: 8px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 1.5;
	}

	.item-attrs {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		font-size: 14px;
		color: #999;
	}

	.item-price,
	.item-subtotal {
		width: 15%;
		text-align: center;
		font-size: 16px;
	}

	.item-subtotal {
		color: #ff4d4f;
		font-weight: 500;
	}

	.item-quantity {
		width: 15%;
		text-align: center;
	}

	.quantity-input {
		width: 120px;
		margin: 0 auto;
	}

	.item-action {
		width: 10%;
		text-align: center;
	}

	.delete-btn {
		color: #ff4d4f;
		display: flex;
		align-items: center;
		gap: 5px;
		margin: 0 auto;
	}

	.delete-btn:hover {
		color: #d93025;
	}

	/* 操作栏 */
	.cart-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 0 10px;
	}

	.batch-delete {
		color: #666;
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.batch-delete:hover {
		color: #ff4d4f;
	}

	.cart-summary {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.summary-item {
		font-size: 16px;
		color: #666;
	}

	.total-price {
		color: #333;
		font-weight: 500;
	}

	.total-price .price {
		font-size: 20px;
		color: #ff4d4f;
		font-weight: 600;
		margin: 0 5px;
	}

	.total-price .tax {
		font-size: 14px;
		color: #999;
		margin-left: 5px;
	}

	.checkout-btn {
		min-width: 160px;
		height: 48px;
		font-size: 16px;
		border-radius: 8px;
		background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
		border-color: transparent;
	}

	/* 推荐商品 */
	.recommend-section {
		margin-top: 40px;
	}

	.recommend-title {
		font-size: 18px;
		font-weight: 600;
		color: #333;
		margin-bottom: 20px;
		padding-left: 10px;
		border-left: 4px solid #409eff;
	}

	.recommend-products {
		display: flex;
		gap: 20px;
		overflow-x: auto;
		padding-bottom: 10px;
	}

	.recommend-item {
		min-width: 200px;
		background-color: #fff;
		border-radius: 8px;
		padding: 15px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		transition: transform 0.3s, box-shadow 0.3s;
	}

	.recommend-item:hover {
		transform: translateY(-5px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
	}

	.recommend-img {
		width: 100%;
		height: 150px;
		object-fit: cover;
		border-radius: 6px;
		margin-bottom: 10px;
	}

	.recommend-name {
		font-size: 14px;
		margin-bottom: 10px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		height: 40px;
	}

	.recommend-price {
		font-size: 16px;
		color: #ff4d4f;
		font-weight: 500;
		margin-bottom: 15px;
	}

	.add-btn {
		width: 100%;
		background-color: #f0f7ff;
		color: #409eff;
		border-color: #e6f7ff;
	}

	.add-btn:hover {
		background-color: #409eff;
		color: #fff;
		border-color: #409eff;
	}

	/* 响应式调整 */
	@media (max-width: 768px) {
		.cart-container {
			padding: 20px 15px;
		}

		.page-title {
			font-size: 20px;
		}

		.header-cols {
			display: none;
		}

		.cart-item {
			flex-direction: column;
			align-items: flex-start;
			padding: 15px;
			border: 1px solid #f5f5f5;
			border-radius: 8px;
			margin-bottom: 15px;
		}

		.item-checkbox {
			position: absolute;
			top: 15px;
			left: 15px;
		}

		.item-info {
			width: 100%;
			margin-bottom: 15px;
			position: relative;
			padding-left: 30px;
		}

		.item-price,
		.item-quantity,
		.item-subtotal,
		.item-action {
			width: 100%;
			text-align: left;
			margin-bottom: 10px;
		}

		.item-price::before {
			content: "单价：";
			color: #999;
			font-size: 14px;
		}

		.item-subtotal::before {
			content: "小计：";
			color: #999;
			font-size: 14px;
		}

		.cart-actions {
			flex-direction: column;
			align-items: flex-start;
			gap: 15px;
		}

		.cart-summary {
			width: 100%;
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
		}

		.checkout-btn {
			width: 100%;
		}

		.recommend-products {
			gap: 15px;
		}

		.recommend-item {
			min-width: 140px;
		}

		.recommend-img {
			height: 100px;
		}
	}
</style>