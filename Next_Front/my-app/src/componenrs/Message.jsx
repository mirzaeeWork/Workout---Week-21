import { useEffect, useState } from "react";
import styles from "./Message.module.css";
import { useFilter } from "@/context/FilterContext";

function Message() {
  const { errOrSuccMessage, setErrOrSuccMessage } = useFilter();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (errOrSuccMessage.message) {
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowMessage(false);
        setErrOrSuccMessage({ error: false, message: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errOrSuccMessage.message]); 

  if (!showMessage) return null;

  return (
    <div
      className={`${styles.message} ${
        errOrSuccMessage.error ? styles.error : styles.success
      }`}
    >
      <h6>{errOrSuccMessage.message}</h6>
    </div>
  );
}

export default Message;
