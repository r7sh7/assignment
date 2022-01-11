import React, { useState } from "react";
import Avatar from "../Avatar/Avatar";
import Email from "../Email/Email";
import FilterHeader from "../FilterHeader/FilterHeader";
import "./Inbox.css";

const Inbox = () => {
  const [filter, setFilter] = useState("Unread");

  const changeFilter = function (name) {
    setFilter(name);
  };

  return (
    <div className="container">
      <FilterHeader category={filter} selectFilter={changeFilter} />
      <div className="container__body">
        <nav>
          <ul>
            {[...Array(10)].map((item) => (
              <Email />
            ))}
          </ul>
        </nav>
        <section className="email__body">
          <header>
            <Avatar />
            <div className="email__body__header">
              <div className="email__body__info">
                <h1>Lorem Ipsum</h1>
                <p>26/02/2020 10:30am</p>
              </div>
              <button className="favorite">Mark as favorite</button>
            </div>
          </header>
          <div className="email__body__content">
            <p>ljsdljqwdjpqwjdpoqwdpojqwdpojqwpdj</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Inbox;
