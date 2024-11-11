import { useContext } from 'react';

import { CitysContext } from '@common/context/ModalContext/CitysContext';

const useModalCitys = () => {
  const citysContext = useContext(CitysContext);

  if (!citysContext) throw new Error('Нет контекста citysContext');

  return citysContext;
};

export default useModalCitys;
