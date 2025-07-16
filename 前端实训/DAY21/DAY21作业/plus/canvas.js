// 星星类，封装星星的属性和行为
class Star {
    static starNum = 500; // 星星数量
    static followRange = 200; // 跟随鼠标移动的范围
    static moveStep = 0.5; // 基本步长
    static meteorChance = 0.0002; // 星星变成流星的概率
    static meteorSpeed = 3; // 流星移动速度
    static trailLength = 10; // 流星曳光长度

    constructor(X, Y, size) {
        this.X = X; // 星星X坐标
        this.Y = Y; // 星星Y坐标
        this.size = size; // 星星大小
        this.originalSize = size; // 星星原始大小

        // 闪烁控制参数
        this.opacity = 1; // 星星透明度
        this.flickerFrame = 0; // 闪烁帧计数器
        this.flickerInterval = Math.floor(Math.random() * 20) + 10; // 闪烁间隔(10 - 30帧)
        this.flickerChange = (Math.random() * 0.3) + 0.2; // 闪烁变化量(0.2 - 0.5)

        // 移动控制参数
        this.show = false; // 是否显示跟随效果
        this.moveFrame = 0; // 移动帧计数器
        this.moveInterval = Math.floor(Math.random() * 10) + 5; // 移动间隔(5 - 15帧)
        this.targetX = X; // 目标X坐标
        this.targetY = Y; // 目标Y坐标
        this.maxFollowDistance = 5; // 最大跟随距离

        // 流星相关参数
        this.isMeteor = false;
        this.trail = [];

        // 新增：是否在圆形范围内的标志
        this.inCircle = false;
    }

    // 更新星星状态
    update(frameCount) {
        if (this.isMeteor) {
            this.updateMeteor();
        } else {
            this.updateFlicker(frameCount);
            this.updatePosition(frameCount);
            // 偶尔星星变成流星
            if (Math.random() < Star.meteorChance) {
                this.isMeteor = true;
            }
        }
    }

    // 更新闪烁效果（基于帧数）
    updateFlicker(frameCount) {
        // 每过flickerInterval帧改变一次透明度
        if (frameCount % this.flickerInterval === 0) {
            // 随机改变透明度
            this.opacity = Math.random() * 0.7 + 0.3; // 0.3 - 1.0

            // 有20%概率改变大小
            if (Math.random() < 0.2) {
                this.size = this.originalSize + (Math.random() * 1 - 0.5); // ±0.5
            }
        }
    }

    // 更新位置（基于帧数）
    updatePosition(frameCount) {
        if (!this.show) return;

        // 每过moveInterval帧移动一次
        if (frameCount % this.moveInterval === 0) {
            // 计算与目标点的距离
            const dx = this.targetX - this.X;
            const dy = this.targetY - this.Y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // 如果距离大于一个小值，则向目标移动
            if (distance > 0.1) {
                // 移动一步，步长与距离成正比
                this.X += (dx / distance) * Star.moveStep;
                this.Y += (dy / distance) * Star.moveStep;
            }
        }
    }

    // 更新流星状态
    updateMeteor() {
        // 流星向左下角移动
        this.X -= Star.meteorSpeed;
        this.Y += Star.meteorSpeed;

        // 添加曳光
        this.trail.push([this.X, this.Y]);
        if (this.trail.length > Star.trailLength) {
            this.trail.shift();
        }

        // 流星超出屏幕后重新生成
        if (this.X < 0 || this.Y > canvas.height) {
            this.isMeteor = false;
            this.X = RD.getRandom(canvas.width, 0);
            this.Y = RD.getRandom(canvas.height, 0);
            this.trail = [];
        }
    }

    // 设置目标位置（鼠标位置）
    setTarget(mouseX, mouseY) {
        // 计算星星到鼠标的方向和距离
        const dx = mouseX - this.X;
        const dy = mouseY - this.Y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 如果距离超过最大跟随距离，则限制目标位置
        if (distance > this.maxFollowDistance) {
            const ratio = this.maxFollowDistance / distance;
            this.targetX = this.X + dx * ratio;
            this.targetY = this.Y + dy * ratio;
        } else {
            // 距离在范围内，直接设置目标为鼠标位置
            this.targetX = mouseX;
            this.targetY = mouseY;
        }

        this.show = true;
    }

    // 重置星星状态
    reset() {
        this.show = false;
        this.targetX = this.X;
        this.targetY = this.Y;
    }

    // 绘制星星或流星
    draw(ctx) {
        // 如果在圆形范围内，增加透明度
        let currentOpacity = this.opacity;
        let currentSize = this.size;
        if (this.inCircle) {
            currentOpacity = 1;
            currentSize = this.size * 1.5; // 增大星星大小
        }

        if (this.isMeteor) {
            // 绘制流星和曳光
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.X, this.Y, currentSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${currentSize * 60},${currentSize * 60},${currentSize * 80}, ${currentOpacity})`;
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            for (let i = 0; i < this.trail.length; i++) {
                const point = this.trail[i];
                const alpha = (i + 1) / this.trail.length;
                ctx.save();
                ctx.beginPath();
                ctx.arc(point[0], point[1], currentSize * alpha, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${currentSize * 60},${currentSize * 60},${currentSize * 80}, ${currentOpacity * alpha})`;
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
        } else {
            // 绘制星星
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.X, this.Y, currentSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${currentSize * 60},${currentSize * 60},${currentSize * 80}, ${currentOpacity})`;
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }
}

let canvas = document.getElementById("frame");
let ctx = canvas.getContext("2d");

// 设置Canvas尺寸为窗口大小
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize);

let frameW = canvas.width;
let frameH = canvas.height;

let starList = [];
let frameCount = 0; // 全局帧计数器

// 初始化星星数据
function initData() {
    for (let i = 0; i < Star.starNum; i++) {
        // 随机大小(1 - 3)
        const size = RD.getRandom(3, 1);
        starList.push(new Star(RD.getRandom(frameW, 0), RD.getRandom(frameH, 0), size));
    }
}

// 初始化绘制环境
function init() {
    ctx.clearRect(0, 0, frameW, frameH);
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, frameW, frameH);
}

// 绘制所有星星
function draw() {
    frameCount++; // 增加帧计数

    for (let i = 0; i < Star.starNum; i++) {
        const star = starList[i];

        // 更新星星状态
        star.update(frameCount);

        // 绘制星星或流星
        star.draw(ctx);
    }
    ctx.restore();

    // 添加高斯模糊的透明蒙版
    ctx.save();
    ctx.filter = 'blur(5px)';
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

// 动画循环
function animate() {
    init();
    draw();
    requestAnimationFrame(animate);
}

initData();
animate();

// 鼠标移动事件处理
canvas.addEventListener("mousemove", (event) => {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;
    const circleRadius = 100; // 圆形选取范围的半径

    for (let i = 0; i < starList.length; i++) {
        const star = starList[i];
        const dx = mouseX - star.X;
        const dy = mouseY - star.Y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 判断星星是否在圆形范围内
        star.inCircle = distance <= circleRadius;

        // 如果鼠标在星星Star.followRange像素范围内，星星向鼠标移动
        if (distance <= Star.followRange) {
            star.setTarget(mouseX, mouseY);
        } else if (star.show) {
            // 鼠标离开范围，星星慢慢回到原位
            star.reset();
        }
    }
});