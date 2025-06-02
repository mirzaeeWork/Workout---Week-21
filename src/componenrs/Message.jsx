import { useEffect, useState } from "react";
import styles from "./Message.module.css";

function Message({ error,text}) {

  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!showMessage) return null;

  return (
    <div
      className={`${styles.message} ${
        (error) ? styles.error : styles.success
      }`}
    >
      {error ? <h6>{error}</h6> : <h6>{text}</h6>}
       
    </div>
  );
}

export default Message;
