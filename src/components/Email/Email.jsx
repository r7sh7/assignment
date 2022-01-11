import React from "react";
import Avatar from "../Avatar/Avatar";
import "./Email.css";

const Email = () => {
  return (
    <li>
      <Avatar />
      <section>
        <header>
          <p>
            From: <strong>Foo Bar &lt;foo.bar@gmail.com&gt;</strong>
          </p>
          <p>
            Subject: <strong>Lorem Ipsum</strong>
          </p>
        </header>
        <p>khfljflkjljflwe, wkefhofw, whfoojwef</p>
        <footer>
          <p>
            26/02/2020 10:30am <span>Favorite</span>
          </p>
        </footer>
      </section>
    </li>
  );
};

export default Email;
