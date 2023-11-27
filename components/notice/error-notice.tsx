import { useEffect } from "react";
import { useNotice } from "../comfirm-error";
import { toast } from "../ui/use-toast";

export default function ErrorNotice({ ...props }) {
  const { setOpenDialog } = useNotice();
  const { error } = props;

  useEffect(() => {
    if (error?.code === "401") {
      setOpenDialog(error);
    } else {
      toast({
        variant: "destructive",
        title: `${error?.message}`,
      });
    }
  }, [error]);

  return null;
}
