export const initialStore = () => ({
  baseUrl: "https://playground.4geeks.com/contact",
  contacts: []
});

export default function storeReducer(store = initialStore(), action = {}) {
  switch (action.type) {
    case 'SET_CONTACTS':
      return {
        ...store,
        contacts: action.payload
      };

      case 'CREATE_CONTACT':
        return {
          ...store,
          contacts: [...store.contacts, action.payload]
        };

      case 'EDIT_CONTACT':
        const editedContact = action.payload;
        return {
          ...store,
          contacts: store.contacts.map(contact => contact.id === editedContact.id ? editedContact : contact)
        }

      case 'DELETE_CONTACT':
        return {
          ...store,
          contacts: store.contacts.filter(contact => contact.id !== action.payload)
        }
        
    default:
      return store;
  }
}