import { useContext, useEffect, useState } from "react"
import { isCorrectLiveHoloUrl } from "../../utils/util"
import HoloButton from "./Hololive"
import { GroupContext } from "./groupContext"

export type Api = {
  available_at: string
  channel: {
    english_name: string
    id: string
    name: string
    //org?: ""
    org?: "Hololive" | "Nijisanji" | "Aogiri Highschool" | "VSpo"
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
}

const GroupIcon = () => {
  const holoVideo = "https://www.youtube.com/watch?v="
  const holoUrl = "https://holodex.net/api/v2/live/"
  const [holoData, setHoloData] = useState<Api[]>([])
  useEffect(() => {
    ;(async () => {
      const res = await fetch(holoUrl, {
        headers: {
          "X-APIKEY": "c910c475-f3b8-4980-b69a-4045e6aa10ff",
        },
      })
      const users = await res.json()
      setHoloData(users)
    })()
  }, [])

  const getFilteredData = (org: string) => {
    return holoData.filter((data) => data.channel.org === org);
  };

  // const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const {selectedGroup} = useContext(GroupContext)


  return (
    <div className="max-md:absolute flex justify-end mr-3 max-md:items-end max-md:flex-col right-[2px] top-[60px] z-[2]">
      {selectedGroup === null && holoData.map((holoDatas: Api) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
          <a
            key={holoDatas.id}
            className="flex items-center gap-x-3.5 max-md:mt-[-32px] py-2 mx-[-7px] rounded-md text-sm text-gray-800 dark:text-gray-400"
            target="_blank"
            href={`${holoVideo}${holoDatas.id}`}
          >
            <img
              className="inline-block md:h-[2.875rem] h-[3.475rem] md:w-[2.875rem] w-[3.475rem] rounded-full ring-1 ring-red-600"
              src={holoDatas.channel.photo}
              alt="Image Description"
            />
          </a>
        ) : null
      })}

      {selectedGroup === "All Group" && holoData.map((holoDatas: Api) => {
        return isCorrectLiveHoloUrl(holoDatas) ? (
          <a
            key={holoDatas.id}
            className="flex items-center gap-x-3.5 max-md:mt-[-32px] py-2 mx-[-7px] rounded-md text-sm text-gray-800 dark:text-gray-400"
            target="_blank"
            href={`${holoVideo}${holoDatas.id}`}
          >
            <img
              className="inline-block md:h-[2.875rem] h-[3.475rem] md:w-[2.875rem] w-[3.475rem] rounded-full ring-1 ring-red-600"
              src={holoDatas.channel.photo}
              alt="Image Description"
            />
          </a>
        ) : null
      })}
      
      {selectedGroup=== "Hololive" && getFilteredData("Hololive").map((holoDatas: Api) => (
        <a
          key={holoDatas.id}
          className="flex items-center gap-x-3.5 max-md:mt-[-32px] py-2 mx-[-7px] rounded-md text-sm text-gray-800 dark:text-gray-400"
          target="_blank"
          href={`${holoVideo}${holoDatas.id}`}
        >
          <img
            className="inline-block md:h-[2.875rem] h-[3.475rem] md:w-[2.875rem] w-[3.475rem] rounded-full ring-1 ring-red-600"
            src={holoDatas.channel.photo}
            alt="Image Description"
          />
        </a>
      ))} 
     
      {selectedGroup==="Nijisanji" && getFilteredData("Nijisanji").map((holoDatas: Api) => (
        <a
          key={holoDatas.id}
          className="flex items-center gap-x-3.5 max-md:mt-[-32px] py-2 mx-[-7px] rounded-md text-sm text-gray-800 dark:text-gray-400"
          target="_blank"
          href={`${holoVideo}${holoDatas.id}`}
        >
          <img
            className="inline-block md:h-[2.875rem] h-[3.475rem] md:w-[2.875rem] w-[3.475rem] rounded-full ring-1 ring-red-600"
            src={holoDatas.channel.photo}
            alt="Image Description"
          />
        </a>
      ))} 

       {selectedGroup==="Aogiri Highschool" && getFilteredData("Aogiri Highschool").map((holoDatas: Api) => (
        <a
          key={holoDatas.id}
          className="flex items-center gap-x-3.5 max-md:mt-[-32px] py-2 mx-[-7px] rounded-md text-sm text-gray-800 dark:text-gray-400"
          target="_blank"
          href={`${holoVideo}${holoDatas.id}`}
        >
          <img
            className="inline-block md:h-[2.875rem] h-[3.475rem] md:w-[2.875rem] w-[3.475rem] rounded-full ring-1 ring-red-600"
            src={holoDatas.channel.photo}
            alt="Image Description"
          />
        </a>
      ))}


       {selectedGroup==="VSpo" && getFilteredData("VSpo").map((holoDatas: Api) => (
        <a
          key={holoDatas.id}
          className="flex items-center gap-x-3.5 max-md:mt-[-32px] py-2 mx-[-7px] rounded-md text-sm text-gray-800 dark:text-gray-400"
          target="_blank"
          href={`${holoVideo}${holoDatas.id}`}
        >
          <img
            className="inline-block md:h-[2.875rem] h-[3.475rem] md:w-[2.875rem] w-[3.475rem] rounded-full ring-1 ring-red-600"
            src={holoDatas.channel.photo}
            alt="Image Description"
          />
        </a>
      ))} 

    </div>
  )
}

export default GroupIcon