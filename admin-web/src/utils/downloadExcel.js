
import axios from 'axios';
import { getToken } from '@/utils/auth'
/**
 * 下载 Excel 文件
 * @param {string} url - 请求的 URL 地址
 * @param {object} params - 查询参数，通常是一个包含筛选条件的对象
 * @param {string} fileName - 下载文件的名称
 */
async function downloadExcel(url, params, fileName) {
  const token = getToken()
  try {
    // 发送 GET 请求，携带查询参数
    const response = await axios.get(url, {
      params,  // 传递查询参数
      headers: {
        'authentication': token
      },
      responseType: 'arraybuffer',  // 告诉 axios 返回二进制数据
    });

    // 获取文件数据
    const fileData = response.data;

    // 创建一个 Blob 对象
    const blob = new Blob([fileData], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // 创建一个临时的下载 URL
    const urlObj = window.URL.createObjectURL(blob);

    // 创建一个 <a> 标签
    const link = document.createElement('a');
    link.href = urlObj;
    link.download = fileName || 'download.xlsx';  // 使用传入的文件名或默认文件名

    // 自动触发下载
    link.click();

    // 下载完成后，释放临时 URL
    window.URL.revokeObjectURL(urlObj);
  } catch (error) {
    console.error('下载 Excel 文件失败:', error);
  }
}


export default downloadExcel