import React, { useState, useContext, useEffect } from 'react'
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {

    const contactContext = useContext(ContactContext);

    const { addContact, clearCurrent, updateContact, current } = contactContext;

    useEffect(() => {
        if (current != null) {
            setContact(current);
        }
        else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [contactContext, current]);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    const onChange = (e) => setContact({
        ...contact,
        [e.target.name]: e.target.value
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (current === null) {
            addContact(contact);
        }
        else {
            updateContact(contact);
        }
        clearAll();
    }

    const clearAll = () => {
        clearCurrent();
    }


    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">
                {current === null ? 'Add Contact' : 'Edit Contact'}
            </h2>
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
            <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} />
            <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />
            <h5>Contact type</h5>
            <input id="personal" type="radio" name="type" value="personal" checked={type === "personal"} onChange={onChange} />
            <label htmlFor="personal">Personal</label>
            {' '}
            <input id="professional" type="radio" name="type" value="professional" checked={type === "professional"} onChange={onChange} />
            <label htmlFor="professional">Professional</label>
            <div>
                <input type="submit" value={current === null ? 'Add Contact' : 'Update Contact'} className="btn btn-primary btn-block" />
            </div>
            {current && (<div>
                <button type="button" className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
            </div>)}
        </form>
    )
}

export default ContactForm;
