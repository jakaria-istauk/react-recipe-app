import { createContext, useContext } from 'react'

export const AppData = createContext();
export const AppDataProvider = AppData.Provider;

const useData = (key) => {
  const {getValue} = useContext(AppData);

  return getValue(key);
}

export default useData;
