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
                type: 'professional'
            },
            {
                id: 3,
                name: 'Adams',
                email: 'adamst@gmailcom',
                phone: '515-111-1111',
                type: 'professional'
            }
        ],
        current: null,
        filtered: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // ADD 
    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    }
    // DELETE
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    }

    // SET CURRENT
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }

    // CLEAR CURRENT
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }
    // UPDATE
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    }
    // FILTER
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    }

    // CLEAR FILTER
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }
    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )

}

export default ContactState;