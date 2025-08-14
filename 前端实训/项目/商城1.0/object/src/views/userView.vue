<template>
  <div class="profile-container">
    <!-- 背景图 -->
    <div class="profile-bg"></div>

    <!-- 个人信息卡片 -->
    <div class="profile-card">
      <!-- 头部信息区域 -->
      <div class="profile-header">
        <div class="avatar-container">
          <el-avatar :size="100" class="user-avatar">
            <img src="https://picsum.photos/200/200?random=50" alt="用户头像" />
          </el-avatar>
          <el-button type="text" class="edit-avatar">
            <Camera />
            <span>更换头像</span>
          </el-button>
        </div>
        
        <div class="user-info">
          <div class="user-name">
            <span>小张</span>
            <el-button type="text" class="edit-btn">
              <Edit />
            </el-button>
          </div>
          <div class="user-bio">这是简介</div>
        </div>
      </div>

      <!-- 数据统计 -->
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-value">24</div>
          <div class="stat-label">发布动态</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">1.2k</div>
          <div class="stat-label">获赞数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">356</div>
          <div class="stat-label">粉丝</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">128</div>
          <div class="stat-label">关注</div>
        </div>
      </div>

      <!-- 个人信息表单 -->
      <el-form class="profile-form" label-width="100px">
        <el-form-item label="用户ID:">
          <el-input v-model="profileInfo.userId" disabled />
        </el-form-item>
        
        <el-form-item label="昵称:">
          <el-input v-model="profileInfo.nickname" />
        </el-form-item>
        
        <el-form-item label="手机号码:">
          <el-input v-model="profileInfo.phone" />
        </el-form-item>
        
        <el-form-item label="邮箱:">
          <el-input v-model="profileInfo.email" />
        </el-form-item>
        
        <el-form-item label="性别:">
          <el-radio-group v-model="profileInfo.gender">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
            <el-radio label="secret">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="生日:">
          <el-date-picker
            v-model="profileInfo.birthday"
            type="date"
            placeholder="选择生日"
            format="YYYY-MM-DD"
          />
        </el-form-item>
        
        <el-form-item label="所在地:">
          <el-cascader
            v-model="profileInfo.location"
            :options="cityOptions"
            placeholder="选择所在地"
          />
        </el-form-item>
        
        <el-form-item label="个性签名:">
          <el-input
            v-model="profileInfo.bio"
            type="textarea"
            rows="4"
            placeholder="请输入个性签名"
          />
        </el-form-item>
        
        <el-form-item class="form-actions" label-width="0">
          <el-button type="primary" class="save-btn">保存修改</el-button>
          <el-button type="text" class="cancel-btn">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 功能菜单 -->
    <div class="function-menu">
      <h3 class="menu-title">账户设置</h3>
      <div class="menu-items">
        <el-button type="text" class="menu-item">
          <Lock />
          <span>修改密码</span>
          <ArrowRight />
        </el-button>
        <el-button type="text" class="menu-item">
          <Bell />
          <span>通知设置</span>
          <ArrowRight />
        </el-button>
        <el-button type="text" class="menu-item">
          <Eye />
          <span>隐私设置</span>
          <ArrowRight />
        </el-button>
        <el-button type="text" class="menu-item">
          <HelpFilled />
          <span>帮助中心</span>
          <ArrowRight />
        </el-button>
        <el-button type="text" class="menu-item danger">
          <Delete />
          <span>注销账户</span>
          <ArrowRight />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

// 个人信息数据
const profileInfo = reactive({
  userId: 'user12345678',
  nickname: '小张',
  phone: '138****6789',
  email: 'xiaozhang@example.com',
  gender: 'female',
  birthday: '2000-08-15',
  location: ['310000', '310100', '310104'],
  bio: '热爱生活的前端开发者，喜欢探索新技术，偶尔分享学习心得和生活点滴。'
});

// 城市选择器示例数据
const cityOptions = [
  {
    value: '310000',
    label: '上海市',
    children: [
      {
        value: '310100',
        label: '上海市',
        children: [
          { value: '310101', label: '黄浦区' },
          { value: '310104', label: '徐汇区' },
          { value: '310105', label: '长宁区' }
        ]
      }
    ]
  },
  {
    value: '110000',
    label: '北京市',
    children: [
      {
        value: '110100',
        label: '北京市',
        children: [
          { value: '110101', label: '东城区' },
          { value: '110102', label: '西城区' }
        ]
      }
    ]
  }
];
</script>

<style scoped>
/* 基础容器样式 */
.profile-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 30px 20px;
  box-sizing: border-box;
  background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

/* 背景图样式 */
.profile-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/../public/background/loginBg.svg');
  background-size: cover;
  background-position: center;
  z-index: 1;
  filter: brightness(0.95);
}

/* 个人信息卡片样式 */
.profile-card, .function-menu {
  width: 100%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  z-index: 2;
  padding: 30px;
  box-sizing: border-box;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.profile-card:hover, .function-menu:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px) scale(1.005);
}

/* 头部信息样式 */
.profile-header {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.user-avatar {
  border: 4px solid #f0f7ff;
  box-shadow: 0 5px 15px rgba(102, 177, 255, 0.2);
}

.edit-avatar {
  color: #66b1ff;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
}

.user-info {
  flex-grow: 1;
}

.user-name {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.edit-btn {
  color: #999;
  font-size: 16px;
}

.edit-btn:hover {
  color: #409eff;
}

.user-bio {
  color: #666;
  font-size: 15px;
  line-height: 1.5;
}

/* 数据统计样式 */
.stats-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 22px;
  font-weight: 700;
  color: transparent;
  background: linear-gradient(135deg, #aaaaff 0%, #66b1ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

/* 表单样式 */
.profile-form {
  width: 100%;
}

.el-form-item {
  margin-bottom: 25px;
  position: relative;
}

.el-form-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%);
}

.el-input, .el-radio-group, .el-date-picker, .el-cascader {
  width: 100%;
  max-width: 500px;
}

.el-input__wrapper {
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.8);
}

.el-input__wrapper:hover {
  border-color: #cbd5e1;
  box-shadow: 0 0 0 3px rgba(226, 232, 240, 0.3);
}

.el-input__wrapper:focus-within {
  border-color: #409eff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.2);
}

/* 表单按钮样式 */
.form-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
}

.save-btn {
  width: 140px;
  height: 45px;
  font-size: 16px;
  border-radius: 12px;
  background: linear-gradient(135deg, #aaaaff 0%, #66b1ff 100%);
  border-color: transparent;
}

.cancel-btn {
  width: 140px;
  height: 45px;
  font-size: 16px;
  border-radius: 12px;
  color: #666;
}

/* 功能菜单样式 */
.menu-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  padding-left: 10px;
  border-left: 4px solid #66b1ff;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.menu-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 12px;
  color: #333;
  font-size: 16px;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background-color: #f0f7ff;
  color: #409eff;
}

.menu-item danger {
  color: #ff4d4f;
}

.menu-item danger:hover {
  background-color: #fff2f0;
  color: #ff4d4f;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .profile-container {
    padding: 20px 15px;
  }
  
  .profile-card, .function-menu {
    padding: 20px 15px;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .user-name {
    justify-content: center;
  }
  
  .stats-container {
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .stat-item {
    flex: 1 1 40%;
  }
  
  .el-form-item {
    padding-right: 10px;
  }
  
  .el-input, .el-radio-group, .el-date-picker, .el-cascader {
    max-width: 100%;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 15px;
  }
  
  .save-btn, .cancel-btn {
    width: 100%;
  }
}
</style>