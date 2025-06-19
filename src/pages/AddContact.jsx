import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactForm } from "../components/ContactForm.jsx";
import { useNavigate } from "react-router-dom";

export function AddContact() {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    async function createContact(contactData) {
        const { name, email, phone, address } = contactData;
        if (
            !name?.trim() ||
            !email?.trim() ||
            !phone?.trim() ||
            !address?.trim()
        ) {
            alert("Por favor, completa todos los campos antes de guardar.");
            return;
        }

        try {
            const response = await fetch(`${store.baseUrl}/agendas/Felipe/contacts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contactData)
            });

            if (response.ok) {
                const newContact = await response.json();
                dispatch({ type: 'CREATE_CONTACT', payload: newContact });
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="agenda-container">
            <ContactForm title="Añadir nuevo contacto" onSave={createContact} />
        </div>
    );
}
