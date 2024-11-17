import { useState } from 'react';

const login = async (email:string, password:string) => {
    try {
      const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "ログインに失敗しました。");
      }

      const data = await res.json();
      return data.message;
    } catch (error) {
      throw new Error("ログインに失敗しました。");
    }
  };
export default login;
