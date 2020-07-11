import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, removeMessage, selectMessages } from "./lobbySlice";
import client from "../../app/feather";
import styles from "./Lobby.module.css";

export function MessageList() {
  const messages = useSelector(selectMessages);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const messageService = client.service("messages");

  useEffect(() => {
    const addMessageListener = message => {
      console.log(message);
      dispatch(addMessage(message));
    };
    const removeMessageListener = message => {
      console.log(message);
      dispatch(removeMessage(message));
    };

    messageService.on("created", addMessageListener);
    messageService.on("removed", removeMessageListener);
    return () => {
      messageService.removeListener("created", addMessageListener);
      messageService.removeListener("removed", removeMessageListener);
    };
  }, [dispatch, messageService]);

  return (
    <div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Send message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => messageService.create({ text: message })}
        >
          Create Message
        </button>
      </div>
      <div className={styles.row}>
        <table className={styles.table} style={{ border: "black 1px solid" }}>
          <thead>
            <tr>
              <th>User</th>
              <th>Message</th>
              <th>Remove?</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(message => {
              return (
                <tr>
                  <td>{message.user && message.user.displayName}</td>
                  <td>{message.text}</td>
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => messageService.remove(message.uuid)}
                    >
                      x
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
