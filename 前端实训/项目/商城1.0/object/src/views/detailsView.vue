<template>
	<div class="product-container">
		<!-- 背景装饰 -->
		<div class="product-bg"></div>

		<!-- 导航栏 -->
		<div class="product-nav">
			<el-icon class="nav-icon" @click="back">
				<ArrowLeft />
			</el-icon>
			<div class="nav-title">{{Product.name}}</div>
			<div class="nav-actions">
				<el-icon class="nav-icon">
					<Search />
				</el-icon>
				<el-icon class="nav-icon">
					<Share />
				</el-icon>
				<el-icon class="nav-icon">
					<Star />
				</el-icon>
			</div>
		</div>

		<!-- 商品主内容区 -->
		<div class="product-main">
			<!-- 商品图片轮播 -->
			<div class="product-images">
				<el-carousel height="100%" indicator-position="bottom" :autoplay="false">
					<el-carousel-item>
						<img src="https://picsum.photos/800/800?random=1" alt="商品图片1" class="main-img" />
					</el-carousel-item>
					<el-carousel-item>
						<img src="https://picsum.photos/800/800?random=2" alt="商品图片2" class="main-img" />
					</el-carousel-item>
					<el-carousel-item>
						<img src="https://picsum.photos/800/800?random=3" alt="商品图片3" class="main-img" />
					</el-carousel-item>
					<el-carousel-item>
						<img src="https://picsum.photos/800/800?random=4" alt="商品图片4" class="main-img" />
					</el-carousel-item>
				</el-carousel>
			</div>

			<!-- 商品信息 -->
			<div class="product-info">
				<div class="tags">
					<el-tag type="error" size="small">{{Product.priceTag}}</el-tag>
					<el-tag type="primary" size="small">{{Product.priceType}}</el-tag>
				</div>

				<h1 class="product-title">
					{{Product.name}}
				</h1>

				<div class="price-section">
					<div class="current-price">
						<span class="symbol">¥</span>
						<span class="number">{{Product.price}}</span>
						<span class="unit">.00</span>
					</div>
					<div class="original-price">¥{{Product.price}}</div>
					<div class="discount">直降200元</div>
				</div>

				<div class="sales-info">
					<span>已售 2.5万+</span>
					<span class="separator">|</span>
					<span>好评率 98%</span>
					<span class="separator">|</span>
					<span>官方正品</span>
				</div>

				<!-- 商品属性选择 -->
				<div class="product-attributes">
					<div class="attr-group">
						<h3 class="attr-title">颜色:</h3>
						<div class="attr-options">
							<el-button type="text" class="attr-option selected">黑色</el-button>
							<el-button type="text" class="attr-option">白色</el-button>
							<el-button type="text" class="attr-option">蓝色</el-button>
							<el-button type="text" class="attr-option">红色</el-button>
						</div>
					</div>

					<div class="attr-group">
						<h3 class="attr-title">版本:</h3>
						<div class="attr-options">
							<el-button type="text" class="attr-option selected">标准版</el-button>
							<el-button type="text" class="attr-option">精英版</el-button>
							<el-button type="text" class="attr-option">旗舰版</el-button>
						</div>
					</div>
				</div>

				<!-- 服务保障 -->
				<div class="service保障">
					<div class="service-item">
						<el-icon>
							<Truck />
						</el-icon>
						<span>全场免运费</span>
					</div>
					<div class="service-item">
						<el-icon>
							<RefreshLeft />
						</el-icon>
						<span>7天无理由退换</span>
					</div>
					<div class="service-item">
						<el-icon>
							<Shield />
						</el-icon>
						<span>两年质保服务</span>
					</div>
				</div>
			</div>
		</div>

		<!-- 商品详情 -->
		<div class="product-details">
			<h3 class="section-title">商品详情</h3>
			<div class="detail-content">
				<img src="https://picsum.photos/1000/500?random=10" alt="商品详情" class="detail-img" />
				<img src="https://picsum.photos/1000/600?random=11" alt="商品详情" class="detail-img" />
				<img src="https://picsum.photos/1000/700?random=12" alt="商品详情" class="detail-img" />
				<img src="https://picsum.photos/1000/550?random=13" alt="商品详情" class="detail-img" />
			</div>
		</div>

		<!-- 推荐商品 -->
		<div class="recommended-products">
			<h3 class="section-title">猜你喜欢</h3>
			<div class="products-grid">
				<div class="product-card" v-for="i in 4" :key="i">
					<img :src="`https://picsum.photos/300/300?random=${20+i}`" alt="推荐商品" class="card-img" />
					<h4 class="card-title">无线充电器快充版</h4>
					<p class="card-price">¥89.00</p>
				</div>
			</div>
		</div>

		<!-- 底部操作栏 -->
		<div class="product-actions">
			<el-button class="action-btn" icon="Shield">加入购物车</el-button>
			<el-button class="action-btn primary" type="primary">立即购买</el-button>
		</div>
	</div>
</template>

<script setup>
	import {
		defineProps,
		ref
	} from "vue";


	// 获取传入的参数

	let props = defineProps({
		priceId: {
			required: true
		}
	});



	// 使用获取到的商品内容作为值
	import useProducts from '@/store/products.js'
	const pList = useProducts();

	// 从中获取到当前商品的相关信息
	let Product = ref();
	Product = pList.queryProductsById(props.priceId);

	// 使用仓库中的值，代替页面上的固定值
</script>

<style scoped>
	/* 基础容器样式 */
	.product-container {
		position: relative;
		width: 100%;
		min-height: 100vh;
		background-color: #f5f7fa;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
		overflow-x: hidden;
	}

	/* 背景图样式 */
	.product-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('https://picsum.photos/1920/1080?random=0');
		background-size: cover;
		background-position: center;
		z-index: 1;
		filter: brightness(0.9) opacity(0.1);
	}

	/* 导航栏样式 */
	.product-nav {
		position: sticky;
		top: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 20px;
		background-color: rgba(255, 255, 255, 0.95);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		z-index: 100;
		backdrop-filter: blur(8px);
	}

	.nav-icon {
		font-size: 22px;
		color: #333;
		cursor: pointer;
		transition: color 0.3s ease;
	}

	.nav-icon:hover {
		color: #409eff;
	}

	.nav-title {
		font-size: 18px;
		font-weight: 500;
		color: #333;
	}

	.nav-actions {
		display: flex;
		gap: 20px;
	}

	/* 商品主内容区 */
	.product-main {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
		box-sizing: border-box;
		z-index: 10;
		position: relative;
	}

	/* 商品图片轮播 */
	.product-images {
		width: 100%;
		background-color: #fff;
		border-radius: 12px;
		overflow: hidden;
		margin-bottom: 20px;
	}

	.main-img {
		width: 100%;
		height: auto;
		object-fit: cover;
	}

	/* 商品信息 */
	.product-info {
		background-color: #fff;
		border-radius: 12px;
		padding: 25px;
		margin-bottom: 20px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
	}

	.tags {
		margin-bottom: 15px;
		display: flex;
		gap: 10px;
	}

	.product-title {
		font-size: 22px;
		font-weight: 600;
		color: #333;
		margin-bottom: 20px;
		line-height: 1.4;
	}

	.price-section {
		display: flex;
		align-items: center;
		gap: 15px;
		margin-bottom: 20px;
		padding-bottom: 20px;
		border-bottom: 1px solid #f0f0f0;
	}

	.current-price {
		display: flex;
		align-items: baseline;
		color: #ff4d4f;
	}

	.symbol {
		font-size: 18px;
		font-weight: 500;
	}

	.number {
		font-size: 32px;
		font-weight: 700;
	}

	.unit {
		font-size: 18px;
	}

	.original-price {
		font-size: 14px;
		color: #999;
		text-decoration: line-through;
	}

	.discount {
		font-size: 14px;
		color: #ff4d4f;
		background-color: rgba(255, 77, 79, 0.1);
		padding: 3px 8px;
		border-radius: 4px;
	}

	.sales-info {
		font-size: 14px;
		color: #666;
		margin-bottom: 25px;
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.separator {
		color: #e0e0e0;
	}

	/* 商品属性 */
	.product-attributes {
		margin-bottom: 25px;
	}

	.attr-group {
		margin-bottom: 20px;
	}

	.attr-title {
		font-size: 16px;
		font-weight: 500;
		color: #333;
		margin-bottom: 12px;
	}

	.attr-options {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.attr-option {
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		padding: 8px 15px;
		transition: all 0.3s ease;
	}

	.attr-option:hover {
		border-color: #409eff;
		color: #409eff;
	}

	.attr-option.selected {
		border-color: #409eff;
		color: #409eff;
		background-color: rgba(64, 158, 255, 0.05);
	}

	/* 服务保障 */
	.service保障 {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		padding-top: 15px;
		border-top: 1px solid #f0f0f0;
	}

	.service-item {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 14px;
		color: #666;
	}

	/* 商品详情和推荐商品通用标题 */
	.section-title {
		font-size: 20px;
		font-weight: 600;
		color: #333;
		margin-bottom: 15px;
		padding-left: 10px;
		border-left: 4px solid #409eff;
	}

	/* 商品详情 */
	.product-details {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto 30px;
		padding: 0 20px;
		box-sizing: border-box;
		position: relative;
		z-index: 10;
	}

	.detail-content {
		background-color: #fff;
		border-radius: 12px;
		padding: 20px;
	}

	.detail-img {
		width: 100%;
		height: auto;
		margin-bottom: 15px;
		border-radius: 8px;
	}

	/* 推荐商品 */
	.recommended-products {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto 80px;
		padding: 0 20px;
		box-sizing: border-box;
		position: relative;
		z-index: 10;
	}

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 15px;
	}

	.product-card {
		background-color: #fff;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
		transition: transform 0.3s ease;
	}

	.product-card:hover {
		transform: translateY(-5px);
	}

	.card-img {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	.card-title {
		font-size: 16px;
		color: #333;
		padding: 10px 15px 5px;
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.card-price {
		font-size: 18px;
		color: #ff4d4f;
		font-weight: 500;
		padding: 0 15px 15px;
		margin: 0;
	}

	/* 底部操作栏 */
	.product-actions {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		background-color: #fff;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
		z-index: 100;
	}

	.action-btn {
		flex: 1;
		height: 55px;
		margin: 10px;
		border-radius: 8px;
		font-size: 16px;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.action-btn.primary {
		background: linear-gradient(135deg, #aaaaff 0%, #66b1ff 100%);
		border-color: transparent;
		color: #fff;
	}

	.action-btn.primary:hover {
		background: linear-gradient(135deg, #9999ee 0%, #55a0ee 100%);
		border-color: transparent;
	}

	/* 响应式调整 */
	@media (max-width: 768px) {
		.product-title {
			font-size: 18px;
		}

		.number {
			font-size: 26px;
		}

		.products-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.card-img {
			height: 150px;
		}

		.action-btn {
			height: 50px;
			font-size: 15px;
		}
	}

	@media (min-width: 769px) {
		.product-main {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 20px;
		}
	}
</style>