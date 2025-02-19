import { useContext } from "react"
import { useAuth } from "../atoms/AuthContext"
import HoloButton from "../atoms/Hololive"
import { GroupContext } from "../atoms/groupContext"

interface Props {
  isOpenDrawer: boolean
  toggleDrawer: () => void
}

const Drawer = ({ isOpenDrawer, toggleDrawer }: Props) => {
  const { isAuthenticated } = useAuth();
  const { isFavoriteFilter, setIsFavoriteFilter } = useContext(GroupContext);

  const handleFavoriteFilter = () => {
    setIsFavoriteFilter(!isFavoriteFilter);
  };

  return (
    <div className={`drawer ${isOpenDrawer ? "active" : ""}`}>
      <nav onClick={toggleDrawer} className="px-2 py-4 bg-[#F3F4F6] cursor-pointer">
        <div className="block p-3 text-gray-900">Home</div>
      </nav>
      {isAuthenticated && (
        <nav
          onClick={handleFavoriteFilter}
          className={`px-2 py-4 bg-[#F3F4F6] cursor-pointer ${
            isFavoriteFilter ? "bg-gray-200" : ""
          }`}
        >
          <div className="block p-3 text-gray-900 flex items-center">
            <svg
              className={`w-5 h-5 mr-2 ${isFavoriteFilter ? "text-yellow-500" : "text-gray-500"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            お気に入り
          </div>
        </nav>
      )}
      <HoloButton setGroup="All Group"/>
      <HoloButton setGroup="Hololive"/>
      <HoloButton setGroup="Nijisanji" />
      <HoloButton setGroup="Aogiri Highschool" />
      <HoloButton setGroup="VSpo" />
      <HoloButton setGroup="774inc" />
      <HoloButton setGroup="Neo-Porte" />
    </div>
  );
};

export default Drawer;