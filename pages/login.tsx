import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../components/atoms/LoginForm';
import { useAuth } from '../components/atoms/AuthContext';

const LoginPage = () => {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleLoginSuccess = (token: string) => {
    login(token);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <LoginForm onSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;