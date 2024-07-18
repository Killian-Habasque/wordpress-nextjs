import { createContext, useContext, useEffect, useState } from "react";
import { getHeader } from "../lib/api";

const HeaderContext = createContext(null);

export const HeaderProvider = ({ children, initialMenu }) => {
  const [menu, setMenu] = useState(initialMenu || null);

  const fetchHeader = async () => {
    const data = await getHeader('Header');
    setMenu(data);
  };

  useEffect(() => {
    if (!menu) {
      fetchHeader();
    }
  }, [menu]);

  return (
    <HeaderContext.Provider value={menu}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);
