import axios from 'axios';

const register = async (username: string, email: string, password: string) => { // emailを追加
  try {
    const response = await axios.post('http://localhost:8080/api/register', { username, email, password }); // emailを追加
    return response.data;
  } catch (error) {
    // エラーハンドリングをより詳細に
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Registration failed:', error.response.status, error.response.data);
        throw new Error(`${error.response.status}: ${error.response.data}`); // ステータスコードとエラーメッセージを返す
      } else if (error.request) {
        console.error('Registration failed: No response received', error.request);
        throw new Error('No response received');
      } else {
        console.error('Registration failed:', error.message);
        throw new Error(error.message);
      }
    } else {
      console.error('Registration failed:', error);
      throw error;
    }
  }
};

export default register;
