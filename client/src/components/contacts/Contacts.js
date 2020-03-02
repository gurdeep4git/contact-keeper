import React, { useContext, Fragment, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import Spinner from "../layout/Spinner";

import ContactItem from "./ContactItem";

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();
        //eslint-disable-next-line
    }, []);

    if (contacts != null && contacts.length === 0 && !loading) {
        return <h4>Please add contacts!</h4>;
    }

    return (
        <Fragment>
            {contacts !== null && !loading ? (
                <Fragment>
                    {filtered !== null
                        ? filtered.map((contact, index) => (
                              <ContactItem
                                  key={contact._id}
                                  contact={contact}
                              />
                          ))
                        : contacts.map((contact, index) => (
                              <ContactItem
                                  key={contact._id}
                                  contact={contact}
                              />
                          ))}
                </Fragment>
            ) : (
                <Spinner />
            )}
        </Fragment>
    );
};

export default Contacts;
