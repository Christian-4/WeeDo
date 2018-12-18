import React from "react";
import "./ChatMessage.css";

export default ({ image, name, message, userConected }) => (
  <React.Fragment>
    {console.log(userConected,name)}
    {userConected === name ? (
      <section className="message-section-right">
        <img src={image} className="image-chat" />
        <div className="text-message">
          <p>{message}</p>
        </div>
      </section>
    ) : (
      <section className="message-section-left">
        <img src={image} className="image-chat" />
        <div className="text-message">
          <p>{message}</p>
        </div>
      </section>
    )}
  </React.Fragment>
);
