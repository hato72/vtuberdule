import { Api } from "./groupIcon";
import { isCorrectLiveHoloUrl } from "../../utils/util"
import dayjs from "dayjs"

interface Props {
  filteredData: Api[]
  isChangeLiveCardSize: boolean
  fixedVideo: boolean
  isHidden: boolean
  setIsHovering: React.Dispatch<React.SetStateAction<number>>
  handleFixed: () => void
  youtube_jpeg: string
  youtube_jpeg_size: { large: string; midium: string }
  holoVideo: string
  isFixedVideo: boolean,
  ref: React.RefObject<HTMLDivElement>,
  isHovering: number
}

const liveCardFilter = ({
  filteredData,
  isChangeLiveCardSize,
  fixedVideo,
  isHidden,
  setIsHovering,
  handleFixed,
  youtube_jpeg,
  youtube_jpeg_size,
  holoVideo,
  isFixedVideo,
  ref,
  isHovering,

}: Props) => {
    return filteredData.map((holoDatas:Api,index) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
            <div
              key={holoDatas.id}
              className={`relative ${
                isChangeLiveCardSize ? "w-[23.5vw]" : "w-[19vw]"
              } max-xl:w-[24%] max-lg:w-[32%] max-mm:w-[48.5%] max-md:w-[48.5%] max-sm:w-[48.5%] max-xs:w-[48.5%] h-full flex flex-col border shadow-sm rounded-xl bg-gray-800 border-gray-700 shadow-slate-700/[.7]`}
              onMouseEnter={!fixedVideo ? () => setIsHovering(index) : undefined}
              onMouseLeave={!fixedVideo ? () => setIsHovering(-1) : undefined}
            >
              {isFixedVideo ? (
                <button
                  className={`${
                    fixedVideo ? "opacity-80" : "opacity-30"
                  } hover:opacity-100 rounded-t-[11px] mb-[0.5px]`}
                  onClick={handleFixed}
                >
                  🧷 Preview固定 {fixedVideo ? "on" : "off"}
                </button>
              ) : undefined}
              <div
                className={`${isHovering === index ? "" : "absolute z-[-1]"}`}
                ref={ref}
                style={{ display: isHidden ? "none" : "block" }}
              >
                {/* <HoverVideo videoId={holoDatas.id} isHovering={isHovering === index} /> */}
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
    })
}

export default liveCardFilter