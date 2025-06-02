import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const router = useRouter()

  const [name, setName] = useState(router.query.name || "");
  const [priceRange, setPriceRange] = useState([
    +router?.query?.minPrice || 1,
    +router?.query?.maxPrice || 5000
  ]);
  const [perPage, setPerPage] = useState(+router?.query?.page || 1);
  const [defaultData, setDefaultData] = useState(null);
  const [openModalProduct, setOpenModalProduct] = useState(false)

  return (
    <FilterContext.Provider value={{ name, setName, priceRange, setPriceRange, perPage, 
    setPerPage, defaultData, setDefaultData, openModalProduct, setOpenModalProduct }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
