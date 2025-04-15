import { useState, useEffect } from "react";

import styles from "./Message.module.css";

function Message({ type, msg }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!!msg);

    if (msg) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [msg]);

  return (
    <>
      {visible && (
        <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
      )}
    </>
  );
}

export default Message;
