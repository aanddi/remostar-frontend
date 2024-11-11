import { Toaster } from 'react-hot-toast';

const ToasterProvider = () => {
  return (
    <Toaster position="top-right" toastOptions={{ style: { fontSize: ' 14px' }, duration: 3000 }} />
  );
};
export default ToasterProvider;
