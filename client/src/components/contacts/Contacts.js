import React, { useContext, Fragment } from 'react'
import ContactContext from "../../context/contact/contactContext";

const Contacts = () => {

    const contactContext = useContext(ContactContext);
    const { contacts } = contactContext;

    return (
        <Fragment>
            {contacts.map((contact, index) => (
                <h3 key={contact.id}>{contact.name}</h3>
            ))}
        </Fragment>
    );
};

export default Contacts;