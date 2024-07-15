import dayjs from "dayjs"
import { useEffect, useState,useContext } from "react"
import { isCorrectLiveHoloUrl } from "../../utils/util"
import { isCorrectScheduleHoloUrl } from "../../utils/util"
//import { Api } from "./groupIcon"
import { GroupContext } from "./groupContext"
import { Api } from "./liveCard"
import { GlobalChangeCardContext } from "@/utils/globalChangeCardObserver"

//import HOLODEX_API_KEY from "@/env"

interface Props {
  searchQuery:string
}

const ScheduleCard = ({searchQuery}:Props) => {
  const youtube_jpeg = "https://img.youtube.com/vi/"
  const youtube_jpeg_size = {
    large: "/maxresdefault.jpg",
    midium: "/sddefault.jpg",
  }
  const holoVideo = "https://www.youtube.com/watch?v="
  const holoUrl = "https://holodex.net/api/v2/live/"
  const [holoData, setHoloData] = useState<Api[]>([])
  const { isChangeCardSize, toggleChangeCardSize } = useContext(GlobalChangeCardContext)

  //const dotenv = require('dotenv').config();

  useEffect(() => {
    ;(async () => {
      const res = await fetch(holoUrl, {
        headers: {
          "X-APIKEY": process.env.NEXT_PUBLIC_HOLODEX_API_KEY || "",
          
        },
      })
      const users = await res.json()
      setHoloData(users)
    })()
  }, [])

  //事務所を判別する関数
  const getFilteredData = (org: string) => {
    return holoData.filter((data) => data.channel.org === org);
  };
  const {selectedGroup} = useContext(GroupContext)

  //最初の画面もしくはAll Groupボタンが押された状態の時はholodataを返す
  //それ以外のボタンであればgetFilterでグループ判別
  const Groupfilter = () => { 
    if(selectedGroup === null || selectedGroup === "All Group"){
      return holoData
    }
    return getFilteredData(selectedGroup)
  }

  // 検索クエリに一致する配信者をフィルタリングする関数
  const filterSearchResults = () => {
    if (!searchQuery) { //検索窓に何も入っていないときはそのまま
      return holoData;
    }
    if (selectedGroup === null || selectedGroup === "All Group"){ //検索窓に文字列が入力されていて、かつ初期画面かAll Groupボタンを押していた場合
      return holoData.filter((holoData) =>
        holoData.channel.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    //入力があり、All Group以外のボタンを押していた場合
    return holoData.filter((Data) =>
        Data.channel.org === selectedGroup && Data.channel.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // レンダリングする配信者データを決定する
  const renderedData = searchQuery ? filterSearchResults() : holoData;


  return (
    <div className="flex flex-wrap justify-center h-full gap-2">

      {searchQuery && renderedData.map((holoDatas: Api) => {
        return isCorrectScheduleHoloUrl(holoDatas) ? (
          <div
            key={holoDatas.id}
            className={`relative ${
              isChangeCardSize ? "w-[23.5vw]" : "w-[250px]"
            } max-xl:w-[24%] max-mm:w-[32.5%] max-md:w-[48.5%] max-sm:w-[48%.5] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-[#223e] border-gray-700 shadow-slate-700/[.7] group`}
          >
            <div
              onClick={toggleChangeCardSize}
              className="absolute text-xs font-bold text-center text-gray-200 bottom-1 right-2 opacity-90 max-sm:text-[10px] transition ease-in-out delay-150 xl:hover:-translate-y-1 xl:hover:scale-110 bg-transparent hover:bg-transparent duration-300 xl:cursor-pointer"
            >
              <span className="mr-[1px]">◎</span>配信予定
            </div>
            <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
              <div className="">
                <img
                  className="w-full h-auto rounded-t-xl"
                  src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large}
                  alt="Image Description"
                />
                <div className="p-3 md:p-4">
                  <div className="text-gray-400 max-sm:text-[14px]">
                    {dayjs(holoDatas.start_scheduled).format("MM-DD HH:mm")}
                  </div>
                  <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
                    {holoDatas.title}
                  </h3>
                </div>
              </div>
            </a>
          </div>
        ) : null
      })}
      
      {!searchQuery && Groupfilter().map((holoDatas: Api) => {
      {/* {selectedGroup===null && holoData.map((holoDatas: Api) => { */}
        return isCorrectScheduleHoloUrl(holoDatas) ? (
          <div
            key={holoDatas.id}
            className={`relative ${
              isChangeCardSize ? "w-[23.5vw]" : "w-[250px]"
            } max-xl:w-[24%] max-mm:w-[32.5%] max-md:w-[48.5%] max-sm:w-[48%.5] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-[#223e] border-gray-700 shadow-slate-700/[.7] group`}
          >
            <div
              onClick={toggleChangeCardSize}
              className="absolute text-xs font-bold text-center text-gray-200 bottom-1 right-2 opacity-90 max-sm:text-[10px] transition ease-in-out delay-150 xl:hover:-translate-y-1 xl:hover:scale-110 bg-transparent hover:bg-transparent duration-300 xl:cursor-pointer"
            >
              <span className="mr-[1px]">◎</span>配信予定
            </div>
            <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
              <div className="">
                <img
                  className="w-full h-auto rounded-t-xl"
                  src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large}
                  alt="Image Description"
                />
                <div className="p-3 md:p-4">
                  <div className="text-gray-400 max-sm:text-[14px]">
                    {dayjs(holoDatas.start_scheduled).format("MM-DD HH:mm")}
                  </div>
                  <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
                    {holoDatas.title}
                  </h3>
                </div>
              </div>
            </a>
          </div>
        ) : null
      })}

      {/* {selectedGroup==="All Group" && holoData.map((holoDatas: Api) => {
        return isCorrectScheduleHoloUrl(holoDatas) ? (
          <div
            key={holoDatas.id}
            className={`relative ${
              isChangeCardSize ? "w-[23.5vw]" : "w-[250px]"
            } max-xl:w-[24%] max-mm:w-[32.5%] max-md:w-[48.5%] max-sm:w-[48%.5] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-[#223e] border-gray-700 shadow-slate-700/[.7] group`}
          >
            <div
              onClick={toggleChangeCardSize}
              className="absolute text-xs font-bold text-center text-gray-200 bottom-1 right-2 opacity-90 max-sm:text-[10px] transition ease-in-out delay-150 xl:hover:-translate-y-1 xl:hover:scale-110 bg-transparent hover:bg-transparent duration-300 xl:cursor-pointer"
            >
              <span className="mr-[1px]">◎</span>配信予定
            </div>
            <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
              <div className="">
                <img
                  className="w-full h-auto rounded-t-xl"
                  src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large}
                  alt="Image Description"
                />
                <div className="p-3 md:p-4">
                  <div className="text-gray-400 max-sm:text-[14px]">
                    {dayjs(holoDatas.start_scheduled).format("MM-DD HH:mm")}
                  </div>
                  <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
                    {holoDatas.title}
                  </h3>
                </div>
              </div>
            </a>
          </div>
        ) : null
      })}

      {selectedGroup==="Hololive" && getFilteredData("Hololive").map((holoDatas: Api) => {
        return isCorrectScheduleHoloUrl(holoDatas) ? (
          <div
            key={holoDatas.id}
            className={`relative ${
              isChangeCardSize ? "w-[23.5vw]" : "w-[250px]"
            } max-xl:w-[24%] max-mm:w-[32.5%] max-md:w-[48.5%] max-sm:w-[48%.5] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-[#223e] border-gray-700 shadow-slate-700/[.7] group`}
          >
            <div
              onClick={toggleChangeCardSize}
              className="absolute text-xs font-bold text-center text-gray-200 bottom-1 right-2 opacity-90 max-sm:text-[10px] transition ease-in-out delay-150 xl:hover:-translate-y-1 xl:hover:scale-110 bg-transparent hover:bg-transparent duration-300 xl:cursor-pointer"
            >
              <span className="mr-[1px]">◎</span>配信予定
            </div>
            <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
              <div className="">
                <img
                  className="w-full h-auto rounded-t-xl"
                  src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large}
                  alt="Image Description"
                />
                <div className="p-3 md:p-4">
                  <div className="text-gray-400 max-sm:text-[14px]">
                    {dayjs(holoDatas.start_scheduled).format("MM-DD HH:mm")}
                  </div>
                  <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
                    {holoDatas.title}
                  </h3>
                </div>
              </div>
            </a>
          </div>
        ) : null
      })}

      {selectedGroup==="Nijisanji" && getFilteredData("Nijisanji").map((holoDatas: Api) => {
        return isCorrectScheduleHoloUrl(holoDatas) ? (
          <div
            key={holoDatas.id}
            className={`relative ${
              isChangeCardSize ? "w-[23.5vw]" : "w-[250px]"
            } max-xl:w-[24%] max-mm:w-[32.5%] max-md:w-[48.5%] max-sm:w-[48%.5] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-[#223e] border-gray-700 shadow-slate-700/[.7] group`}
          >
            <div
              onClick={toggleChangeCardSize}
              className="absolute text-xs font-bold text-center text-gray-200 bottom-1 right-2 opacity-90 max-sm:text-[10px] transition ease-in-out delay-150 xl:hover:-translate-y-1 xl:hover:scale-110 bg-transparent hover:bg-transparent duration-300 xl:cursor-pointer"
            >
              <span className="mr-[1px]">◎</span>配信予定
            </div>
            <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
              <div className="">
                <img
                  className="w-full h-auto rounded-t-xl"
                  src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large}
                  alt="Image Description"
                />
                <div className="p-3 md:p-4">
                  <div className="text-gray-400 max-sm:text-[14px]">
                    {dayjs(holoDatas.start_scheduled).format("MM-DD HH:mm")}
                  </div>
                  <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
                    {holoDatas.title}
                  </h3>
                </div>
              </div>
            </a>
          </div>
        ) : null
      })}

      {selectedGroup==="Aogiri Highschool" && getFilteredData("Aogiri Highschool").map((holoDatas: Api) => {
        return isCorrectScheduleHoloUrl(holoDatas) ? (
          <div
            key={holoDatas.id}
            className={`relative ${
              isChangeCardSize ? "w-[23.5vw]" : "w-[250px]"
            } max-xl:w-[24%] max-mm:w-[32.5%] max-md:w-[48.5%] max-sm:w-[48%.5] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-[#223e] border-gray-700 shadow-slate-700/[.7] group`}
          >
            <div
              onClick={toggleChangeCardSize}
              className="absolute text-xs font-bold text-center text-gray-200 bottom-1 right-2 opacity-90 max-sm:text-[10px] transition ease-in-out delay-150 xl:hover:-translate-y-1 xl:hover:scale-110 bg-transparent hover:bg-transparent duration-300 xl:cursor-pointer"
            >
              <span className="mr-[1px]">◎</span>配信予定
            </div>
            <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
              <div className="">
                <img
                  className="w-full h-auto rounded-t-xl"
                  src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large}
                  alt="Image Description"
                />
                <div className="p-3 md:p-4">
                  <div className="text-gray-400 max-sm:text-[14px]">
                    {dayjs(holoDatas.start_scheduled).format("MM-DD HH:mm")}
                  </div>
                  <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
                    {holoDatas.title}
                  </h3>
                </div>
              </div>
            </a>
          </div>
        ) : null
      })}

      {selectedGroup==="VSpo" && getFilteredData("VSpo").map((holoDatas: Api) => {
        return isCorrectScheduleHoloUrl(holoDatas) ? (
          <div
            key={holoDatas.id}
            className={`relative ${
              isChangeCardSize ? "w-[23.5vw]" : "w-[250px]"
            } max-xl:w-[24%] max-mm:w-[32.5%] max-md:w-[48.5%] max-sm:w-[48%.5] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-[#223e] border-gray-700 shadow-slate-700/[.7] group`}
          >
            <div
              onClick={toggleChangeCardSize}
              className="absolute text-xs font-bold text-center text-gray-200 bottom-1 right-2 opacity-90 max-sm:text-[10px] transition ease-in-out delay-150 xl:hover:-translate-y-1 xl:hover:scale-110 bg-transparent hover:bg-transparent duration-300 xl:cursor-pointer"
            >
              <span className="mr-[1px]">◎</span>配信予定
            </div>
            <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
              <div className="">
                <img
                  className="w-full h-auto rounded-t-xl"
                  src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large}
                  alt="Image Description"
                />
                <div className="p-3 md:p-4">
                  <div className="text-gray-400 max-sm:text-[14px]">
                    {dayjs(holoDatas.start_scheduled).format("MM-DD HH:mm")}
                  </div>
                  <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
                    {holoDatas.title}
                  </h3>
                </div>
              </div>
            </a>
          </div>
        ) : null
      })} */}


      



      {/* {selectedGroup==="All Group" && holoData.map((holoDatas: Api) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
          <>
            <div className="relative w-[250px] max-xl:w-[24%] max-mm:w-[32.5%] max-md:w-[48.5%] max-sm:w-[48%.5] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-[#223e] border-gray-700 shadow-slate-700/[.7]">
              <div className="absolute text-xs font-bold text-center text-gray-200 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
                <span className="mr-[1px]">◎</span>配信予定
              </div>
              <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
                <div className="">
                    <img className="w-full h-auto rouded-t-xl" src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large} alt="Image Description"/>
                    <div className="p-3 md:p-4">
                        <div className="text-gray-400 max-sm:text-[14px]">
                            {dayjs(holoDatas.start_scheduled).format("MM-DD HH:mm")}
                        </div>
                        <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
                            {holoDatas.title}
                        </h3>
                  </div>
                </div>
              </a>
            </div>
          </>
        ) : null
      })}

      {selectedGroup==="Hololive" && getFilteredData("Hololive").map((holoDatas: Api) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
          <>
            <div className="relative w-[250px] max-xl:w-[24%] max-mm:w-[32.5%] max-md:w-[48.5%] max-sm:w-[48%.5] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-[#223e] border-gray-700 shadow-slate-700/[.7]">
              <div className="absolute text-xs font-bold text-center text-gray-200 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
                <span className="mr-[1px]">◎</span>配信予定
              </div>
              <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
                <div className="">
                    <img className="w-full h-auto rouded-t-xl" src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large} alt="Image Description"/>
                    <div className="p-3 md:p-4">
                        <div className="text-gray-400 max-sm:text-[14px]">
                            {dayjs(holoDatas.start_scheduled).format("MM-DD HH:mm")}
                        </div>
                        <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
                            {holoDatas.title}
                        </h3>
                  </div>
                </div>
              </a>
            </div>
          </>
        ) : null
      })}

      {selectedGroup==="Nijisanji" && getFilteredData("Nijisanji").map((holoDatas: Api) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
          <>
            <div className="relative w-[250px] max-xl:w-[24%] max-mm:w-[32.5%] max-md:w-[48.5%] max-sm:w-[48%.5] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-[#223e] border-gray-700 shadow-slate-700/[.7]">
              <div className="absolute text-xs font-bold text-center text-gray-200 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
                <span className="mr-[1px]">◎</span>配信予定
              </div>
              <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
                <div className="">
                    <img className="w-full h-auto rouded-t-xl" src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large} alt="Image Description"/>
                    <div className="p-3 md:p-4">
                        <div className="text-gray-400 max-sm:text-[14px]">
                            {dayjs(holoDatas.start_scheduled).format("MM-DD HH:mm")}
                        </div>
                        <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
                            {holoDatas.title}
                        </h3>
                  </div>
                </div>
              </a>
            </div>
          </>
        ) : null
      })}

      {selectedGroup==="Aogiri Highschool" && getFilteredData("Aogiri Highschool").map((holoDatas: Api) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
          <>
            <div className="relative w-[250px] max-xl:w-[24%] max-mm:w-[32.5%] max-md:w-[48.5%] max-sm:w-[48%.5] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-[#223e] border-gray-700 shadow-slate-700/[.7]">
              <div className="absolute text-xs font-bold text-center text-gray-200 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
                <span className="mr-[1px]">◎</span>配信予定
              </div>
              <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
                <div className="">
                    <img className="w-full h-auto rouded-t-xl" src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large} alt="Image Description"/>
                    <div className="p-3 md:p-4">
                        <div className="text-gray-400 max-sm:text-[14px]">
                            {dayjs(holoDatas.start_scheduled).format("MM-DD HH:mm")}
                        </div>
                        <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
                            {holoDatas.title}
                        </h3>
                  </div>
                </div>
              </a>
            </div>
          </>
        ) : null
      })}

      {selectedGroup==="VSpo" && getFilteredData("VSpo").map((holoDatas: Api) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
          <>
            <div className="relative w-[250px] max-xl:w-[24%] max-mm:w-[32.5%] max-md:w-[48.5%] max-sm:w-[48%.5] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-[#223e] border-gray-700 shadow-slate-700/[.7]">
              <div className="absolute text-xs font-bold text-center text-gray-200 bottom-1 right-2 opacity-90 max-sm:text-[10px]">
                <span className="mr-[1px]">◎</span>配信予定
              </div>
              <a href={`${holoVideo}${holoDatas.id}`} target="_blank">
                <div className="">
                    <img className="w-full h-auto rouded-t-xl" src={youtube_jpeg + holoDatas.id + youtube_jpeg_size.large} alt="Image Description"/>
                    <div className="p-3 md:p-4">
                        <div className="text-gray-400 max-sm:text-[14px]">
                            {dayjs(holoDatas.start_scheduled).format("MM-DD HH:mm")}
                        </div>
                        <h3 className="flex font-bold text-md text-white max-sm:text-[12px]">
                            {holoDatas.title}
                        </h3>
                  </div>
                </div>
              </a>
            </div>
          </>
        ) : null
      })} */}
    </div>
  )
}

export default ScheduleCard