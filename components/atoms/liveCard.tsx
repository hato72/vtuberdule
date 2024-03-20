import dayjs from "dayjs"
import React,{ useContext, useEffect, useRef, useState } from "react"
import { isCorrectLiveHoloUrl } from "../../utils/util"
import { GlobalChangeCardContext } from "../../utils/globalChangeCardObserver"
// import HoverVideo from "./hoverVideo"
import { GroupContext } from "./groupContext"

// import liveCardFilter from "./liveCardFilter"

//import HOLODEX_API_KEY from "@/env"

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

const LiveCard = ({ isFixedVideo,searchQuery}: Props) => {
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
  const { isChangeLiveCardSize } = useContext(GlobalChangeCardContext)
  const ref = useRef<HTMLDivElement>(null)

  const handleFixed = () => {
    setFixedVideo(!fixedVideo)
  }

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

  //const dotenv = require('dotenv').config();

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const res = await fetch(holoUrl, {
        headers: {
          //"X-APIKEY": process.env.HOLODEX_API_KEY || "",
          //"X-APIKEY": process.env.HOLODEX_API_KEY || "c910c475-f3b8-4980-b69a-4045e6aa10ff"
          "X-APIKEY": "c910c475-f3b8-4980-b69a-4045e6aa10ff"
          //"X-APIKEY": HOLODEX_API_KEY
        },
      })
      const users = await res.json()
      setHoloData(users)
    })()
    setLoading(false)
  }, [])


  const getFilteredData = (org: string) => {
    return holoData.filter((data) => data.channel.org === org);
  };

  const {selectedGroup} = useContext(GroupContext)


  const Groupfilter = () => {
    if(selectedGroup === null || selectedGroup === "All Group"){
      return holoData
    }
    return getFilteredData(selectedGroup)
  }



  // 検索クエリに一致する配信者をフィルタリングする関数
  // const filterSearchResults = () => {
  //   if (!searchQuery) { //検索窓に何も入っていないときはそのまま
  //     return holoData;
  //   }

  //   if (selectedGroup === null || selectedGroup === "All Group"){ //検索窓に文字列が入力されていて、かつ初期画面かAll Groupボタンを押していた場合
  //     return holoData.filter((holoData) =>
  //       holoData.channel.name.toLowerCase().normalize().includes(searchQuery.toLowerCase().normalize())
  //     );
  //   }
  //   //All Group以外のボタンを押している状態で入力を行った場合
  //   return holoData.filter((Data) =>
  //       Data.channel.org === selectedGroup && Data.channel.name.toLowerCase().normalize().includes(searchQuery.toLowerCase().normalize())
  //   );
  // };

  const filterSearchResults = () => {
    if (!searchQuery) { //検索窓に何も入っていないときはそのまま
      return holoData;
    }

    const searchQuery_ = searchQuery.toLowerCase()

    if (selectedGroup === null || selectedGroup === "All Group"){ //検索窓に文字列が入力されていて、かつ初期画面かAll Groupボタンを押していた場合
      return holoData.filter((holoData) =>{
        const channel_ = holoData.channel.name.toLowerCase().includes(searchQuery_)
        const title_ = holoData.title.toLowerCase().includes(searchQuery_)
        return (
          channel_ || title_
        )
      });
    }
    //All Group以外のボタンを押している状態で入力を行った場合
    return holoData.filter((holoData) =>{
      const channel_ = holoData.channel.name.toLowerCase().includes(searchQuery_)
      const title_ = holoData.title.toLowerCase().includes(searchQuery_)
      return (
        holoData.channel.org === selectedGroup && (channel_ || title_)
      )
    });
  };

  // レンダリングする配信者データを決定する
  const renderedData = searchQuery ? filterSearchResults() : holoData;

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

      {/* 検索窓に入力がある時、入力に応じて配信者の検索を行う */}
      {searchQuery && renderedData.map((holoDatas: Api, index) =>
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
          ></div>
          <div className="absolute text-xs font-bold text-center text-red-500 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
            <span className="mr-[1px]">●</span>REC
          </div>
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
      )}
      
      {!searchQuery && Groupfilter().map((holoDatas: Api, index) => {
      {/* {selectedGroup=== null && holoData.map((holoDatas: Api, index) => { */}
        return isCorrectLiveHoloUrl(holoDatas) ? (
          <div
            key={holoDatas.id}
            className={`relative ${
              isChangeLiveCardSize ? "w-[23.5vw]" : "w-[19vw]"
            } max-xl:w-[24%] max-lg:w-[32%] max-mm:w-[48.5%] max-md:w-[48.5%] max-sm:w-[48.5%] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-gray-800 border-gray-700 shadow-slate-700/[.7]`}
            onMouseEnter={!fixedVideo ? () => setIsHovering(index) : undefined}
            onMouseLeave={!fixedVideo ? () => setIsHovering(-1) : undefined}
          >
            {/* {isFixedVideo ? (
              <button
                className={`${
                  fixedVideo ? "opacity-80" : "opacity-30"
                } hover:opacity-100 rounded-t-[11px] mb-[0.5px]`}
                onClick={handleFixed}
              >
                🧷 Preview固定 {fixedVideo ? "on" : "off"}
              </button>
            ) : undefined} */}
            <div
              className={`${isHovering === index ? "" : "absolute z-[-1]"}`}
              ref={ref}
              style={{ display: isHidden ? "none" : "block" }}
            >
              
            </div>
            <div className="absolute text-xs font-bold text-center text-red-500 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
              <span className="mr-[1px]">●</span>REC
            </div>
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
      })}

      {/* {selectedGroup=== "All Group" && holoData.map((holoDatas: Api, index) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
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
            >
              
            </div>
            <div className="absolute text-xs font-bold text-center text-red-500 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
              <span className="mr-[1px]">●</span>REC
            </div>
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
      })}


      {selectedGroup=== "Hololive" && getFilteredData("Hololive").map((holoDatas: Api, index) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
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
            >
              
            </div>
            <div className="absolute text-xs font-bold text-center text-red-500 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
              <span className="mr-[1px]">●</span>REC
            </div>
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
      })}

      {selectedGroup=== "Nijisanji" && getFilteredData("Nijisanji").map((holoDatas: Api, index) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
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
            >
              
            </div>
            <div className="absolute text-xs font-bold text-center text-red-500 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
              <span className="mr-[1px]">●</span>REC
            </div>
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
      })}

      {selectedGroup=== "Aogiri Highschool" && getFilteredData("Aogiri Highschool").map((holoDatas: Api, index) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
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
            >
             
            </div>
            <div className="absolute text-xs font-bold text-center text-red-500 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
              <span className="mr-[1px]">●</span>REC
            </div>
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
      })}

      {selectedGroup=== "VSpo" && getFilteredData("VSpo").map((holoDatas: Api, index) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
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
            >
             
            </div>
            <div className="absolute text-xs font-bold text-center text-red-500 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
              <span className="mr-[1px]">●</span>REC
            </div>
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
      })} */}
    </>
  )
}

export default LiveCard