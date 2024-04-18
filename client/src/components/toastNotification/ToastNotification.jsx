import { toast } from 'sonner';

export const ToastNotification = (toastType, message) => {
  switch (toastType) {
    case 'success':
      return toast.success(message, {
        style: {
          background: '#007200',
          color: 'white',
          height: '60px',
          fontSize: '14px',
        },
        className: 'class',
        duration: 3000,
      });
    case 'error':
      return toast.error(message, {
        style: {
          background: '#d00000',
          color: 'white',
          height: '60px',
          fontSize: '14px',
        },
        className: 'class',
        duration: 3000,
      });
    case 'info':
      return toast.info(message, {
        style: {
          background: '#023e7d',
          color: 'white',
          height: '60px',
          fontSize: '14px',
        },
        className: 'class',
        duration: 3000,
      });
    case 'warning':
      return toast.warning(message, {
        style: {
          background: '#ffee32',
          color: 'black',
          height: '60px',
          fontSize: '14px',
        },
        className: 'class',
        duration: 3000,
      });
    default:
      return;
  }
};
