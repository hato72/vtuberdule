import React, { createContext, useState } from "react"

interface GroupContextValue {
  selectedGroup: string | null
  setSelectedGroup: React.Dispatch<React.SetStateAction<string | null>>
}

export const GroupContext = createContext<GroupContextValue>({
  selectedGroup: null,
  setSelectedGroup: () => {},
})

export const GroupProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  return (
    <GroupContext.Provider value={{ selectedGroup, setSelectedGroup }}>
      {children}
    </GroupContext.Provider>
  )
}