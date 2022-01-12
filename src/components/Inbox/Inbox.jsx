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
  const [favorite, setFavorite] = useState([]);
  const [read, setRead] = useState([]);
  const [emailList, setEmailList] = useState();

  const dispatch = useDispatch();
  let { emails } = useSelector((state) => state.emailList);
  const { email } = useSelector((state) => state.selectedEmail);
  const history = useHistory();
  const { id } = useParams();

  const changeFilter = function (name) {
    setFilter(name);
    const filteredEmails = emails.reduce((acc, element) => {
      if (name === "Unread" && !read.includes(element.id)) {
        return [element, ...acc];
      } else if (name === "Read" && read.includes(element.id)) {
        return [element, ...acc];
      } else if (favorite.includes(element.id)) {
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
    setFavorite(favorite.filter((e) => e !== id));
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
            {favorite.includes(selectedEmail.id) ? (
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
    setRead([...read, e.target.id]);
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
            {emailList
              ? emailList.map((email) => (
                  <Email
                    email={email}
                    key={email?.id}
                    fav={favorite}
                    read={read}
                    active={selectedEmail?.id}
                  />
                ))
              : emails.map((email) => (
                  <Email
                    email={email}
                    key={email?.id}
                    fav={favorite}
                    read={read}
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
