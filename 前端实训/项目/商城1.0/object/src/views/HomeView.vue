<template>
	<div class="mall-home">
		<!-- 顶部导航栏 -->
		<el-header class="main-header">
			<div class="header-container">
				<!-- 左侧Logo -->
				<div class="logo">
					<ShoppingBag class="logo-icon" />
				</div>

				<!-- 中间导航链接 - 仅在中等屏幕以上显示 -->
				<el-menu class="main-nav" mode="horizontal" :default-active="activeNav" @select="handleNavSelect">
					<el-menu-item index="home">首页</el-menu-item>
					<el-menu-item index="hot">热销</el-menu-item>
					<el-menu-item index="new">新品</el-menu-item>
					<el-menu-item index="discount">特惠</el-menu-item>
					<el-menu-item index="category">全部分类</el-menu-item>
				</el-menu>

				<!-- 右侧用户功能区 -->
				<div class="user-actions">
					<el-input v-model="searchQuery" placeholder="搜索商品..." class="search-input"
						prefix-icon="Search"></el-input>
					<el-button icon="User" class="action-btn" circle></el-button>
					<el-button icon="ShoppingCart" class="action-btn" circle @click="goCart()"></el-button>
					<el-button icon="Star" class="action-btn" circle></el-button>
				</div>
			</div>
		</el-header>

		<!-- 轮播图 -->
		<div class="carousel-container">
			<el-carousel height="400px" indicator-position="bottom" :autoplay="true">
				<el-carousel-item v-for="(banner, index) in banners" :key="index">
					<img :src="banner" alt="轮播图" class="carousel-img" />
				</el-carousel-item>
			</el-carousel>
		</div>

		<!-- 分类导航 -->
		<div class="category-nav">
			<template v-for="(category, index) in pList.categories" :key="index">
				<div @click="setShowType(category.name)" class="category-item">
					<!-- 当点击分类导航的时候，实现数据的切换 -->
					<div class="category-icon">
						<el-icon>
							<!-- 使用字体图标 -->
							<component :is="category.icon"></component>
						</el-icon>
					</div>
					<span class="category-name">{{ category.name }}</span>
				</div>
			</template>
		</div>

		<!-- 分类商品筛选区域 -->
		<div class="product-section">
			<!-- 区域标题 -->
			<div class="section-header">
				<h2 class="section-title">{{showType}}</h2>
				<el-button type="text" class="view-more">查看全部</el-button>
			</div>

			<!--  分类商品网格 -->
			<div class="product-grid">
				<div class="product-card" v-for="(product, index) in pList.showProductsByType(showType)" :key="index"
					@click="showDetails(product.id)">
					<div class="product-img-container">
						<img :src="product.imgUrl" alt="商品图片" class="product-img" />
						<el-tag v-if="product.discount" class="product-discount" type="danger">
							{{ product.discount }}折
						</el-tag>
					</div>
					<h3 class="product-title">{{ product.name }}</h3>
					<div class="product-price">
						<span class="current-price">¥{{ product.price.toFixed(2) }}</span>
						<span class="original-price"
							v-if="product.originalPrice">¥{{ product.originalPrice.toFixed(2) }}</span>
					</div>
					<div class="product-footer">
						<div class="product-rating">
							<Star class="star-icon" />
							<span class="rating-text">{{ product.rating }}</span>
						</div>
						<el-button icon="ShoppingCart" class="add-to-cart" circle size="small"></el-button>
					</div>
				</div>
			</div>
		</div>


		<!-- 商品列表区域 -->
		<div class="product-section">
			<!-- 区域标题 -->
			<div class="section-header">
				<h2 class="section-title">热销商品</h2>
				<el-button type="text" class="view-more">查看全部</el-button>
			</div>

			<!-- 热销商品网格 -->
			<div class="product-grid">
				<!-- 先实现一个卡片的跳转效果 -->
				<!-- 当点击以后，跳转至对应的商品 -->
				<div class="product-card" v-for="(product, index) in pList.showProductsByTag('热销商品')" :key="index"
					@click="showDetails(product.id)">
					<div class="product-img-container">
						<img :src="product.imgUrl" alt="商品图片" class="product-img" />
						<el-tag v-if="product.discount" class="product-discount" type="danger">
							{{ product.discount }}折
						</el-tag>
					</div>
					<h3 class="product-title">{{ product.name }}</h3>
					<div class="product-price">
						<span class="current-price">¥{{ product.price.toFixed(2) }}</span>
						<span class="original-price"
							v-if="product.originalPrice">¥{{ product.originalPrice.toFixed(2) }}</span>
					</div>
					<div class="product-footer">
						<div class="product-rating">
							<Star class="star-icon" />
							<span class="rating-text">{{ product.rating }}</span>
						</div>
						<el-button icon="ShoppingCart" class="add-to-cart" circle size="small"></el-button>
					</div>
				</div>
			</div>
		</div>

		<!-- 新品区域 -->
		<div class="product-section">
			<div class="section-header">
				<h2 class="section-title">新品上市</h2>
				<el-button type="text" class="view-more">查看全部</el-button>
			</div>

			<div class="product-grid">
				<div class="product-card" v-for="(product, index) in pList.showProductsByTag('新品推荐')" :key="index + 10"
					@click="showDetails(product.id)">
					<div class="product-img-container">
						<img :src="product.imgUrl" alt="商品图片" class="product-img" />
						<el-tag class="product-tag" type="primary">
							新品
						</el-tag>
					</div>
					<h3 class="product-title">{{ product.name }}</h3>
					<div class="product-price">
						<span class="current-price">¥{{ product.price.toFixed(2) }}</span>
					</div>
					<div class="product-footer">
						<div class="product-sales">
							<span class="sales-text">已售 {{ product.sales }}</span>
						</div>
						<el-button icon="ShoppingCart" class="add-to-cart" circle size="small"></el-button>
					</div>
				</div>
			</div>
		</div>

		<!-- 底部信息 -->
		<el-footer class="main-footer">
			<div class="footer-content">
				<div class="footer-section">
					<h3>关于我们</h3>
					<ul>
						<li>公司简介</li>
						<li>联系我们</li>
						<li>招贤纳士</li>
						<li>隐私政策</li>
					</ul>
				</div>
				<div class="footer-section">
					<h3>客户服务</h3>
					<ul>
						<li>帮助中心</li>
						<li>售后服务</li>
						<li>配送信息</li>
						<li>常见问题</li>
					</ul>
				</div>
				<div class="footer-section">
					<h3>关注我们</h3>
					<div class="social-icons">
						<el-button icon="Wechat" circle size="small"></el-button>
						<el-button icon="Weibo" circle size="small"></el-button>
						<el-button icon="Phone" circle size="small"></el-button>
					</div>
				</div>
			</div>
			<div class="copyright">
				© 2025 鸟窝商城 版权所有
			</div>
		</el-footer>
	</div>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	import router from '@/router';
	// 仅定义固定数据，不实现具体交互逻辑
	const activeNav = 'home';
	const searchQuery = '';

	// 轮播图数据
	const banners = [
		'https://picsum.photos/1200/400?random=10',
		'https://picsum.photos/1200/400?random=11',
		'https://picsum.photos/1200/400?random=12'
	];

	import axios from '@/axios';

	// 导入并且创建仓库的行为
	import useProducts from '@/store/products.js'
	const pList = useProducts();

	// 默认显示电子产品
	let showType = ref("电子产品");


	// 切换显示内容的函数
	let setShowType = (type) => {
		showType.value = type;
	}

	// 购物车页面
	// 根据情况完成添加后跳转，或者仅添加的行为
	let goCart = () => {
		router.push("/cart");
	}


	// 将数据请求的行为，放在页面加载完成后触发
	// 使用钩子函数，在页面加载以后，完成数据的请求
	onMounted(async () => {
		// 每一次进入这个组件，都会加载数据
		// 如果这个数据是保存在本组件中的，那么每一次组件重新加载
		// 都会清除上一次请求的数据，数据不会累加

		// 如何防止组件每次都请求数据，导致数据累加？
		if (pList.getProductLength != 0) {
			// 已经完成了数据的加载，不需要再次加载
			return false;
		}

		// 请求商品分类列表
		let {
			data: categories
		} = await axios.get("categories");
		for (let i = 0; i < categories.length; i++) {
			pList.categories.push(categories[i]);
		}


		let {
			data
		} = await axios.get("products");

		// 查看数据是否获取成功
		console.log("获取数据", data);
		// 将获取到的数据保存到仓库中
		for (let i = 0; i < data.length; i++) {
			pList.products.push(data[i]);
		}
	})

	//当点击某个具体商品的时候，实现商品的具体内容的显示
	let showDetails = (priceId) => {
		// 如何实现跳转内容为我们选择的商品
		// 查看是否是预期的值
		console.log("打开的商品id:", priceId);
		// 跳转至商品详情页
		// 跳转页面的时候，如何携带参数?
		router.push(`/details/${priceId}`);
	}


	// 导航选择事件处理
	const handleNavSelect = (index) => {
		// 实际项目中这里会处理导航切换逻辑
		console.log('导航切换到:', index);
	};
</script>

<style scoped>
	/* 基础样式 */
	.mall-home {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
		color: #333;
		background-color: #f5f7fa;
	}

	/* 顶部导航 */
	.main-header {
		background-color: #fff;
		padding: 0;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.header-container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
		height: 60px;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.logo-icon {
		font-size: 24px;
		color: #409eff;
	}

	.logo-text {
		font-size: 18px;
		font-weight: 600;
		color: #333;
	}

	.main-nav {
		flex: 1;
		margin: 0 20px;
	}

	.user-actions {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.search-input {
		width: 200px;
	}

	.action-btn {
		color: #666;
		transition: color 0.3s;
	}

	.action-btn:hover {
		color: #409eff;
	}

	/* 轮播图 */
	.carousel-container {
		width: 100%;
		max-width: 1200px;
		margin: 20px auto;
		border-radius: 8px;
		overflow: hidden;
	}

	.carousel-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* 分类导航 */
	.category-nav {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto 30px;
		padding: 0 20px;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		gap: 15px;
	}

	.category-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 15px;
		background-color: #fff;
		border-radius: 8px;
		width: 80px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		transition: transform 0.3s;
	}

	.category-item:hover {
		transform: translateY(-5px);
	}

	.category-icon {
		font-size: 28px;
		color: #409eff;
		margin-bottom: 8px;
	}

	.category-name {
		font-size: 14px;
		text-align: center;
	}

	/* 商品区域 */
	.product-section {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto 40px;
		padding: 0 20px;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;
	}

	.section-title {
		font-size: 20px;
		font-weight: 600;
		color: #333;
		position: relative;
		padding-left: 10px;
	}

	.section-title::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 4px;
		height: 16px;
		background-color: #409eff;
		border-radius: 2px;
	}

	.view-more {
		color: #409eff;
		padding: 0;
	}

	/* 商品网格 */
	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 15px;
	}

	.product-card {
		background-color: #fff;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
		transition: transform 0.3s, box-shadow 0.3s;
	}

	.product-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
	}

	.product-img-container {
		position: relative;
		height: 200px;
		overflow: hidden;
	}

	.product-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s;
	}

	.product-card:hover .product-img {
		transform: scale(1.05);
	}

	.product-discount,
	.product-tag {
		position: absolute;
		top: 10px;
		left: 10px;
	}

	.product-title {
		font-size: 16px;
		padding: 10px 15px;
		margin: 0;
		height: 44px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.product-price {
		padding: 0 15px 10px;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.current-price {
		font-size: 18px;
		font-weight: 600;
		color: #ff4d4f;
	}

	.original-price {
		font-size: 14px;
		color: #999;
		text-decoration: line-through;
	}

	.product-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px 15px;
	}

	.product-rating,
	.product-sales {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 14px;
		color: #666;
	}

	.star-icon {
		color: #ffb400;
		font-size: 14px;
	}

	.add-to-cart {
		color: #409eff;
		border-color: #409eff;
		transition: all 0.3s;
	}

	.add-to-cart:hover {
		background-color: #409eff;
		color: #fff;
	}

	/* 底部信息 */
	.main-footer {
		background-color: #333;
		color: #fff;
		padding: 40px 0 20px;
		margin-top: 40px;
	}

	.footer-content {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		padding: 0 20px;
		flex-wrap: wrap;
	}

	.footer-section {
		margin-bottom: 30px;
		min-width: 200px;
	}

	.footer-section h3 {
		font-size: 16px;
		margin-bottom: 15px;
		position: relative;
		padding-bottom: 8px;
	}

	.footer-section h3::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 30px;
		height: 2px;
		background-color: #409eff;
	}

	.footer-section ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.footer-section li {
		margin-bottom: 8px;
		font-size: 14px;
		color: #ccc;
		cursor: pointer;
		transition: color 0.3s;
	}

	.footer-section li:hover {
		color: #409eff;
	}

	.social-icons {
		display: flex;
		gap: 10px;
		margin-top: 10px;
	}

	.social-icons .el-button {
		background-color: rgba(255, 255, 255, 0.1);
		border-color: transparent;
		color: #fff;
	}

	.copyright {
		text-align: center;
		font-size: 14px;
		color: #999;
		padding-top: 20px;
		border-top: 1px solid #444;
		margin-top: 20px;
	}

	/* 响应式调整 */
	@media (max-width: 768px) {
		.main-nav {
			display: none;
		}

		.search-input {
			width: 140px;
		}

		.carousel-container {
			margin: 10px auto;
		}

		.el-carousel {
			height: 200px !important;
		}

		.product-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.category-item {
			width: 70px;
			padding: 10px;
		}

		.category-icon {
			font-size: 24px;
		}
	}
</style>