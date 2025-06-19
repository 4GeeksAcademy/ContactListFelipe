import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Contact } from "../components/Contact.jsx";

export function Contacts() {
	const { store, dispatch } = useGlobalReducer();

	async function createAgenda(name) {
		try {
			const response = await fetch(`${store.baseUrl}/agendas/${name}`, {
				method: 'POST'
			})

			return response.ok;

		} catch (error) {
			console.log(error);
			return false;
		}
	};

	useEffect(() => {
		async function fetchContacts() {
			try {
				const response = await fetch(`${store.baseUrl}/agendas/Felipe/contacts`);

				if (response.status === 404) {
					const created = await createAgenda('Felipe')
					if (created) {
						fetchContacts();
					}
				}

				if (response.ok) {
					const data = await response.json();
					dispatch({ type: 'SET_CONTACTS', payload: data.contacts });
				}

			} catch (error) {
				console.log(error);
			}
		};

		fetchContacts();
	}, [dispatch]);

	return (
		<div className="container agenda-container">
			<div className="row">
				<div className="d-flex justify-content-center mt-4 add-contact-button">
					<Link className="btn btn-outline-success" to={'/add-contact'}>+ Añadir contacto</Link>
				</div>
			</div>

			<div className="row mt-4">
				{store.contacts.length > 0 ? (
					store.contacts.map(contact => (
						<div key={contact.id} className="agenda-entry">
							<Contact contact={contact} />
						</div>
					))
				) : (
					<p>No se encontraron contactos.</p>
				)}
			</div>
		</div>


	);
};