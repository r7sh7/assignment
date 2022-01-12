import moment from "moment";
import React from "react";
import Avatar from "../Avatar/Avatar";
import "./Email.css";

const Email = ({ email }) => {
  const { id, from, date, subject, short_description } = email;
  return (
    <li id={id}>
      <Avatar id={id} />
      <section id={id} className="email__list">
        <header id={id}>
          <p id={id}>
            From:{" "}
            <strong id={id}>
              {from?.name} &lt;{from?.email}&gt;
            </strong>
          </p>
          <p id={id}>
            Subject: <strong id={id}>{subject}</strong>
          </p>
        </header>
        <p id={id} className="description">
          {short_description}
        </p>
        <footer id={id} className="email__footer">
          <p id={id}>
            {moment(date).calendar()} {moment(date).format("LT")}{" "}
            <span id={id}>Favorite</span>
          </p>
        </footer>
      </section>
    </li>
  );
};

export default Email;
