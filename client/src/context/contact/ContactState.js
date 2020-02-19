import React, { useReducer } from "react";
import uuid from 'uuid'
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
    ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER
} from "../types";

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Jill',
                email: 'jill@gmailcom',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Jill',
                email: 'jill@gmailcom',
                phone: '111-111-1111',
                type: 'personal'
            }
        ]
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // ADD 
    // DELETE
    // SET CURRENT
    // CLEAR CURRENT
    // UPDATE
    // FILTER
    // CLEAR FILTER

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )

}

export default ContactState;