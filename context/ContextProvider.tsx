import React, { createContext, useContext, useState } from "react";

//Since the amount of changes in filters is limited and application is small there is no need to use flux-based storage system

interface ContentProviderType {
    children: React.ReactNode
}

interface ProviderProps {
    brand: string,
    setBrand: React.Dispatch<React.SetStateAction<string>>
    category: string,
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

 const FilterContext = createContext<ProviderProps>({} as ProviderProps);

const ListingContext = ({ children }:ContentProviderType) => {
 

    const [brand, setBrand] = useState<string>(`All`);
    const [category, setCategory] = useState<string>(`All`);

  return (
    <FilterContext.Provider value={{ brand, setBrand, category, setCategory }}>
      {children}
    </FilterContext.Provider>
  );
};

export default ListingContext;

export const useFilter = () => useContext(FilterContext);
