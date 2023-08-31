import { useContext } from 'react'
import { AppData } from './useData';

const useDitchpatch = () => {
  const {setState} = useContext(AppData);
  return setState;
}

export default useDitchpatch;
