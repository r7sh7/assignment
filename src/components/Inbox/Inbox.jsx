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
  const [selectedEmail, setSelectedEmail] = useState(
    JSON.parse(sessionStorage.getItem("current_email")) || false
  );
  const [favorite, setFavorite] = useState(
    JSON.parse(sessionStorage.getItem("favorites")) || []
  );
  const [read, setRead] = useState(
    JSON.parse(sessionStorage.getItem("read")) || []
  );
  const [emailList, setEmailList] = useState();

  const dispatch = useDispatch();
  let { emails, loading: emailListLoading } = useSelector(
    (state) => state.emailList
  );
  const { email, loading: emailContentLoading } = useSelector(
    (state) => state.selectedEmail
  );

  const history = useHistory();
  const { id } = useParams();

  const changeFilter = function (name) {
    setFilter(name);
    const filteredEmails = emails.reduce((acc, element) => {
      if (name === "Favorites" && favorite.includes(element.id)) {
        return [element, ...acc];
      } else if (name === "Read" && read.includes(element.id)) {
        return [element, ...acc];
      } else if (!read.includes(element.id)) {
        return [element, ...acc];
      }
      return [...acc, element];
    }, []);

    setEmailList(filteredEmails);
  };

  const addEmailToFavorites = () => {
    setFavorite([...favorite, id]);
  };

  const removeFromFavorites = () => {
    console.log(favorite);
    setFavorite(favorite?.filter((e) => e !== id));
  };

  const openEmail = (e) => {
    history.push(`/${e.target.id}`);
    const emailContent = emails.find((email) => email.id === e.target.id);
    if (e.target.id) {
      sessionStorage.setItem("current_email", JSON.stringify(emailContent));
    }
    setSelectedEmail(emailContent);
    if (!read.includes(emailContent.id)) {
      setRead([...read, emailContent.id]);
    }
  };

  const displayEmailBody = function (selectedEmail) {
    return (
      <section className="email__body">
        <header>
          <Avatar name={selectedEmail.from.name} />
          <div className="email__body__header">
            <div className="email__body__info">
              <h1>{selectedEmail?.subject}</h1>
              <p>
                {moment(selectedEmail?.date).calendar()}{" "}
                {moment(selectedEmail?.date).format("LT")}
              </p>
            </div>
            {favorite.includes(selectedEmail?.id) ? (
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
        {emailContentLoading ? (
          <div>Loading....</div>
        ) : (
          <article
            className="email__body__content"
            dangerouslySetInnerHTML={{ __html: email.body }}
          ></article>
        )}
      </section>
    );
  };

  useEffect(() => {
    sessionStorage.setItem("favorites", JSON.stringify(favorite));
    sessionStorage.setItem("read", JSON.stringify(read));
  }, [favorite, read]);

  useEffect(() => {
    dispatch(getEmailList(read));
  }, [dispatch, read]);

  useEffect(() => {
    dispatch(getEmailById(id));
  }, [dispatch, id]);

  return (
    <div className="container">
      <FilterHeader category={filter} selectFilter={changeFilter} />
      <div className={split ? "container__body split" : "container__body"}>
        <nav>
          <ul onClick={openEmail}>
            {emailListLoading ? (
              <div>Loading...</div>
            ) : emailList ? (
              emailList.map((email) => (
                <Email
                  email={email}
                  key={email?.id}
                  fav={favorite}
                  read={read}
                  active={selectedEmail?.id}
                />
              ))
            ) : (
              emails.map((email) => (
                <Email
                  email={email}
                  key={email?.id}
                  fav={favorite}
                  read={read}
                  active={selectedEmail?.id}
                />
              ))
            )}
          </ul>
        </nav>
        {split && displayEmailBody(selectedEmail)}
      </div>
    </div>
  );
};

export default Inbox;
