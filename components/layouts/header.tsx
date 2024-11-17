import { Button } from "@/components/ui/button";
import GroupIcon from "../atoms/groupIcon";
import ActionControlsButton from "../atoms/actionControlButton";
import { useState } from "react";
import login from "../atoms/login";
import register from "../atoms/register";
import Modal from "../atoms/Modal";

interface Props {
  isOpenDrawer: boolean;
  isFixedVideo: boolean;
  toggleDrawer: () => void;
  toggleFixedVideo: () => void;
  onSearch: (query: string) => void;
}

const Header = ({ isOpenDrawer, isFixedVideo, toggleDrawer, toggleFixedVideo, onSearch }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleLogin = async () => {
    try {
      if (isLogin) {
        const result = await login(email, password);
        console.log(result);
        setLoggedInUser(email); // ログイン成功時にユーザー名を設定
        setIsOpen(false); // モーダルを閉じる
      } else {
        const result = await register(username, email, password);
        console.log(result);
        setIsLogin(true); // 登録成功時にログインフォームに切り替え
        setUsername(''); // ユーザー名をクリア
        setPassword(''); // パスワードをクリア
      }
      setLoginError(null);
    } catch (error: any) {
      console.error("Login/Register failed:", error.message);
      setLoginError(error.message);
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <div className="bg-[#eaeaef] w-full h-[70px] flex items-center justify-end py-4 pr-3 gap-3">
        <div className="hidden md:block">
          <GroupIcon />
        </div>
        <ActionControlsButton
          isOpenDrawer={isOpenDrawer}
          isFixedVideo={isFixedVideo}
          toggleDrawer={toggleDrawer}
          toggleFixedVideo={toggleFixedVideo}
        />

        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
        />

        {loggedInUser ? (
          <div className="flex items-center">
            <span className="mr-4">{loggedInUser}</span>
            <Button onClick={handleLogout} className="ml-4">
              ログアウト
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsOpen(true)} className="ml-4">
            ログイン
          </Button>
        )}

        {/* モーダル */}
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="p-4 bg-white rounded-lg shadow-md w-[300px]"> {/* 幅を固定 */}
            <h2 className="text-lg font-bold mb-4">
              {isLogin ? "ログイン" : "ユーザー登録"}
            </h2>
            {loginError && <p className="text-red-500">{loginError}</p>}

            {isLogin ? (
              <>
                <input
                  type="email"
                  placeholder="メールアドレス"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 text-black"
                />
                <input
                  type="password"
                  placeholder="パスワード"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 text-black"
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="ユーザー名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 text-black"
                />
                <input
                  type="email"
                  placeholder="メールアドレス"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 text-black"
                />
                <input
                  type="password"
                  placeholder="パスワード"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 text-black"
                />
              </>
            )}

            <Button onClick={handleLogin} className="w-full mt-4">
              {isLogin ? "ログイン" : "登録"}
            </Button>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="mt-2 text-blue-500 block w-full text-center"
            >
              {isLogin ? "ユーザー登録はこちら" : "ログインはこちら"}
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Header;