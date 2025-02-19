import dayjs from "dayjs"
import React,{ useContext, useEffect, useRef, useState } from "react"
import { isCorrectLiveHoloUrl } from "../../utils/util"
import { GlobalChangeCardContext } from "../../utils/globalChangeCardObserver"
import { GroupContext } from "./groupContext"
import FavoriteButton from "./FavoriteButton"
import { useAuth } from "./AuthContext"

export type Api = {
  available_at: string
  channel: {
    english_name: string
    id: string
    name: string
    org?: "Hololive" | "Nijisanji" | "Aogiri Highschool" | "VSpo" | "774inc" | "Neo-Porte"
    photo: string
    type: string
  }
  duration: number
  id: string
  live_viewres: number
  published_at: string
  start_actual: string
  start_scheduled: string
  status: "live" | "upcoming"
  title: string
  topic_id: string
  type: string
  sort: string
}

interface Props {
  isFixedVideo: boolean
  searchQuery: string
}

const LiveCard = ({ isFixedVideo, searchQuery}: Props) => {
  const youtube_jpeg = "https://img.youtube.com/vi/"
  const youtube_jpeg_size = {
    large: "/maxresdefault.jpg",
    midium: "/sddefault.jpg",
  }
  const holoVideo = "https://www.youtube.com/watch?v="
  const holoUrl = "https://holodex.net/api/v2/live/"
  const [isHovering, setIsHovering] = useState<number>(-1)
  const [holoData, setHoloData] = useState<Api[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isHidden, setIsHidden] = useState(false)
  const [fixedVideo, setFixedVideo] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const { isChangeLiveCardSize } = useContext(GlobalChangeCardContext)
  const { isAuthenticated, token } = useAuth()
  const { isFavoriteFilter } = useContext(GroupContext)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        if (window.innerWidth < 639) {
          ref.current.style.display = "none"
          setIsHidden(true)
        } else {
          ref.current.style.display = "block"
          setIsHidden(false)
        }
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [ref])

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const res = await fetch(holoUrl, {
        headers: {
          "X-APIKEY": process.env.NEXT_PUBLIC_HOLODEX_API_KEY || "",
        },
      })
      const users = await res.json()
      setHoloData(users)
    })()
    setLoading(false)
  }, [])

  // お気に入り一覧を取得
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated || !token) {
        setFavorites([]);
        return;
      }
      try {
        const response = await fetch('http://localhost:8080/api/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFavorites(data && Array.isArray(data) ? data.map((f: any) => f.vtuber_id) : []);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setFavorites([]);
      }
    };
    fetchFavorites();
  }, [isAuthenticated, token]);

  const getFilteredData = (org: string) => {
    return holoData.filter((data) => data.channel.org === org);
  };

  const {selectedGroup} = useContext(GroupContext)

  const Groupfilter = () => {
    let filteredData = holoData;
    
    // グループフィルター
    if(selectedGroup && selectedGroup !== "All Group") {
      filteredData = getFilteredData(selectedGroup);
    }

    // お気に入りフィルター
    if (isFavoriteFilter && isAuthenticated) {
      filteredData = filteredData.filter(data => favorites.includes(data.id));
    }

    return filteredData;
  }

  const filterSearchResults = () => {
    if (!searchQuery) {
      return holoData;
    }

    const searchQuery_ = searchQuery.toLowerCase()
    let filteredData = holoData;

    if (selectedGroup && selectedGroup !== "All Group"){ 
      filteredData = getFilteredData(selectedGroup);
    }

    // お気に入りフィルター
    if (isFavoriteFilter && isAuthenticated) {
      filteredData = filteredData.filter(data => favorites.includes(data.id));
    }

    return filteredData.filter((holoData) =>{
      const channel_ = holoData.channel.name.toLowerCase().includes(searchQuery_)
      const title_ = holoData.title.toLowerCase().includes(searchQuery_)
      return channel_ || title_
    });
  };

  const renderedData = searchQuery ? filterSearchResults() : Groupfilter();

  const renderCard = (holoDatas: Api, index: number) => (
    isCorrectLiveHoloUrl(holoDatas) ? (
      <div
        key={holoDatas.id}
        className={`relative ${
          isChangeLiveCardSize ? "w-[23.5vw]" : "w-[19vw]"
        } max-xl:w-[24%] max-lg:w-[32%] max-mm:w-[48.5%] max-md:w-[48.5%] max-sm:w-[48.5%] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-gray-800 border-gray-700 shadow-slate-700/[.7]`}
        onMouseEnter={!fixedVideo ? () => setIsHovering(index) : undefined}
        onMouseLeave={!fixedVideo ? () => setIsHovering(-1) : undefined}
      >
        <div
          className={`${isHovering === index ? "" : "absolute z-[-1]"}`}
          ref={ref}
          style={{ display: isHidden ? "none" : "block" }}
        />
        <div className="absolute text-xs font-bold text-center text-red-500 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
          <span className="mr-[1px]">●</span>REC
        </div>
        {isAuthenticated && (
          <div className="absolute top-2 right-2 z-10">
            <FavoriteButton 
              vtuberId={holoDatas.id}
              vtuberName={holoDatas.channel.name}
              organization={holoDatas.channel.org || ""}
            />
          </div>
        )}
        <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
          <img
            className="w-full h-auto rounded-t-xl"
            src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large}
            alt="Image Description"
          />
          <div className="p-2 md:p-3">
            <div className="text-gray-400 max-sm:text-[14px]">
              {dayjs(holoDatas.start_scheduled).format("HH:mm")}
            </div>
            <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
              {holoDatas.title}
            </h3>
          </div>
        </a>
      </div>
    ) : null
  );

  return (
    <>
      {loading ? (
        <div
          className="fixed z-[2] top-[40%] animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-[#F3F4F6] rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : null}

      {searchQuery && renderedData.map((holoDatas: Api, index) => renderCard(holoDatas, index))}
      
      {!searchQuery && Groupfilter().map((holoDatas: Api, index) => renderCard(holoDatas, index))}
    </>
  )
}

export default LiveCard
