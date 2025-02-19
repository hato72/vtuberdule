import GroupIcon from "../atoms/groupIcon"
import ActionControlsButton from "../atoms/actionControlButton"
import { useState } from "react"
import { useAuth } from "../atoms/AuthContext"
import { useRouter } from "next/router"

interface Props {
  isOpenDrawer: boolean
  isFixedVideo: boolean
  toggleDrawer: () => void
  toggleFixedVideo: () => void
  onSearch: (query:string) => void
}

const Header = ({ isOpenDrawer, isFixedVideo, toggleDrawer, toggleFixedVideo, onSearch }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleAuth = () => {
    if (isAuthenticated) {
      logout();
    } else {
      router.push('/login');
    }
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

        <button
          onClick={handleAuth}
          className="cursor-pointer inline-flex items-center px-4 h-[46px] min-w-[120px] rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap"
        >
          {isAuthenticated ? (
            <>
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9" />
              </svg>
              <span>ログアウト</span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4 M10 17l5-5-5-5 M15 12H3" />
              </svg>
              <span>ログイン</span>
            </>
          )}
        </button>

        <div className="md:block hidden absolute pl-3 top-[8px] left-[0px] cursor-pointer">
          <div className="text-[32px] text-slate-900"></div>
        </div>
        <span className="cursor-pointer inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border border-gray-400 text-gray-400">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
          </svg>
        </span>
      </div>
    </>
  )
}

export default Header