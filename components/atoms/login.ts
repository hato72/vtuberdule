const login = async (email: string, password: string) => {
  try {
      const res = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include', // Cookieを含める
          body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
          throw new Error(data.error || "ログインに失敗しました");
      }

      return data;
  } catch (error) {
      if (error instanceof Error) {
          throw new Error(error.message);
      }
      throw new Error("ログインに失敗しました");
  }
};

export default login;