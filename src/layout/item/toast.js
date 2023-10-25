import { toast } from "react-semantic-toasts";

export const showToast = (type, title, description, time = 5000) => {
  toast({
    type,
    title,
    description,
    time,
  });
};
