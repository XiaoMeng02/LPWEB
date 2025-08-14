// 导入axios
import axios from 'axios';

// 配置超时时间
axios.defaults.timeout = 5000;
// 全局配置请求路径
axios.defaults.baseURL = 'http://localhost:3000'
// 导出axios
export default axios;