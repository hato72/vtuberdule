
  
export const isCorrectLiveHoloUrl = (holoDatas: any) => {
    const { channel, status, start_scheduled } = holoDatas
    return (
        (channel.org === "Hololive" || channel.org === "Nijisanji" || channel.org === "Aogiri Highschool" || channel.org === "VSpo") &&
        status === "live" &&
        Date.now() - 60 * 60 * 24 * 1000 * 1 < new Date(start_scheduled).getTime()
    )
}

export const isCorrectScheduleHoloUrl = (holoDatas: any) => {
    const { channel, status } = holoDatas
    return (channel.org === "Hololive" || channel.org === "Nijisanji" || channel.org === "Aogiri Highschool" || channel.org === "VSpo") && status === "upcoming" 
}