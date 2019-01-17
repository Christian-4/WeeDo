import React from "react";
import "./ChatMessage.css";
import { Link } from "react-router-dom"

export default ({ image, name, message, userConected, planId }) => (
  <React.Fragment>
    {userConected === name ? (
      <section className="message-section-right">
        <img src={image} className="image-chat" />
        <div className="text-message">
    
          {(planId !== "" && planId !== undefined && planId !== null) ?
                
            <Link to={`/plan/${planId}`} className="plan-invitation">{message}</Link>
            :
            <p>{message}</p>
          } 
        </div>
      </section>
    ) : (
        <section className="message-section-left">
          <img src={image} className="image-chat" />
          <div className="text-message">
            {planId !== "" && planId !== undefined && planId !== null ?

              <Link to={`/plan/${planId}`} className="plan-invitation">{message}</Link>
              :
              <p>{message}</p>
            }

          </div>
        </section>
      )}
  </React.Fragment>
);
