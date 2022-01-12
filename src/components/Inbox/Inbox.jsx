import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getEmailById, getEmailList } from "../../store/emailActions";
import Avatar from "../Avatar/Avatar";
import Email from "../Email/Email";
import FilterHeader from "../FilterHeader/FilterHeader";
import "./Inbox.css";

const Inbox = ({ split }) => {
  const [filter, setFilter] = useState("Unread");
  const [selectedEmail, setSelectedEmail] = useState();
  const [favorites, setFavorites] = useState([]);
  const [readEmails, setReadEmails] = useState([]);

  const dispatch = useDispatch();
  const { emails } = useSelector((state) => state.emailList);
  const { email } = useSelector((state) => state.selectedEmail);
  const history = useHistory();
  const { id } = useParams();

  const changeFilter = function (name) {
    setFilter(name);
  };

  const addEmailToFavorites = () => {
    setFavorites([...favorites, id]);
  };

  const removeFromFavorites = () => {
    setFavorites(favorites.filter((e) => e !== id));
  };

  const displayEmailBody = function (selectedEmail) {
    return (
      <section className="email__body">
        <header>
          <Avatar />
          <div className="email__body__header">
            <div className="email__body__info">
              <h1>{selectedEmail.subject}</h1>
              <p>
                {moment(selectedEmail.date).calendar()}{" "}
                {moment(selectedEmail.date).format("LT")}
              </p>
            </div>
            {favorites.includes(selectedEmail.id) ? (
              <button className="unfavorite" onClick={removeFromFavorites}>
                Unmark as favorite
              </button>
            ) : (
              <button className="favorite" onClick={addEmailToFavorites}>
                Mark as favorite
              </button>
            )}
          </div>
        </header>
        <div
          className="email__body__content"
          dangerouslySetInnerHTML={{ __html: email.body }}
        ></div>
      </section>
    );
  };

  const openEmail = (e) => {
    const emailContent = emails.find((email) => email.id === e.target.id);
    setSelectedEmail({ ...emailContent });
    history.push(`/${e.target.id}`);
    setReadEmails([...readEmails, e.target.id]);
  };

  useEffect(() => {
    dispatch(getEmailList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEmailById(id));
  }, [dispatch, id]);

  return (
    <div className="container">
      <FilterHeader category={filter} selectFilter={changeFilter} />
      <div className={split ? "container__body split" : "container__body"}>
        <nav>
          <ul onClick={openEmail}>
            {emails?.map((email) => (
              <Email
                email={email}
                key={email?.id}
                fav={favorites}
                read={readEmails}
                active={selectedEmail?.id}
              />
            ))}
          </ul>
        </nav>
        {split && displayEmailBody(selectedEmail)}
      </div>
    </div>
  );
};

export default Inbox;
