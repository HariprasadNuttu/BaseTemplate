import { toast } from "react-toastify";
export const SUCCESS = 'success';
export const WARNING = 'warning';
export const INFO = 'info';
export const ERROR = 'error';

export const ToastMessage = (type,message)=>{
    const messageOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }
    switch (type) {
        case 'info':
            toast.info(message, messageOptions);
            break;
        case 'success':
                toast.success(message, messageOptions);
                break;
        case 'error':
            toast.error(message, messageOptions);
            break;
        case 'warning':
            toast.warning(message, messageOptions);
            break;
    
        default:
            break;
    }
    
}

