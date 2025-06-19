import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactForm } from "../components/ContactForm.jsx";
import { useNavigate, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';

export function EditContact() {
    const [contact, setContact] = useState({});
    const { store, dispatch } = useGlobalReducer();
    const {theId} = useParams();
    const navigate = useNavigate();

    function searchContact(){
        const result = store.contacts.find((item) => item.id == theId);
        setContact(result);
    }

    async function editContact(data) {
        try {
            const response = await fetch(`${store.baseUrl}/agendas/Felipe/contacts/${theId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const editedContact = response.json();
                dispatch({ type: 'EDIT_CONTACT', payload: editedContact });
                navigate('/');
            }

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        searchContact()
    }, [])

    return (
        <ContactForm title='Edit contact' onSave={editContact} initialData={contact} />
    )
}