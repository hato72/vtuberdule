import { createContext, useState, ReactNode } from "react";

interface GroupContextType {
  selectedGroup: string | null;
  setSelectedGroup: (group: string) => void;
  isFavoriteFilter: boolean;
  setIsFavoriteFilter: (isFilter: boolean) => void;
}

export const GroupContext = createContext<GroupContextType>({
  selectedGroup: null,
  setSelectedGroup: () => {},
  isFavoriteFilter: false,
  setIsFavoriteFilter: () => {},
});

interface GroupProviderProps {
  children: ReactNode;
}

export const GroupProvider: React.FC<GroupProviderProps> = ({ children }) => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [isFavoriteFilter, setIsFavoriteFilter] = useState(false);

  return (
    <GroupContext.Provider
      value={{
        selectedGroup,
        setSelectedGroup,
        isFavoriteFilter,
        setIsFavoriteFilter,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContext;