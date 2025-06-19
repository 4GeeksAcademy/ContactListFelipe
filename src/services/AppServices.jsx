export const createAgendaAPI = async (apiUrl, agendaSlug) => {
    try {
        const response = await fetch(`${apiUrl}/agenda/${agendaSlug}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        });
        return response;
    } catch (error) {
        console.error("Error in createAgendaAPI:", error);
        throw error;
    }
};

export const loadContactsAPI = async (apiUrl, agendaSlug) => {
    try {
        const response = await fetch(`${apiUrl}/agenda/${agendaSlug}`);
        if (!response.ok && response.status !== 404) {
            throw new Error(`API Error ${response.status}: ${await response.text()}`);
        }
        if (response.status === 404) {
            return { contacts: [] };
        }
        return response.json();
    } catch (error) {
        console.error("Error in loadContactsAPI:", error);
        throw error;
    }
};

export const createContactAPI = async (apiUrl, agendaSlug, contactData) => {
    try {
        const response = await fetch(`${apiUrl}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                full_name: contactData.name,
                phone: contactData.phone,
                email: contactData.email,
                address: contactData.address,
                agenda_slug: agendaSlug
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error ${response.status}: ${errorText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error in createContactAPI:", error);
        throw error;
    }
};

export const updateContactAPI = async (apiUrl, agendaSlug, contactId, contactData) => {
    try {
        const response = await fetch(`${apiUrl}/${contactId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                full_name: contactData.name,
                phone: contactData.phone,
                email: contactData.email,
                address: contactData.address,
                agenda_slug: agendaSlug
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error ${response.status}: ${errorText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error in updateContactAPI:", error);
        throw error;
    }
};

export const deleteContactAPI = async (apiUrl, agendaSlug, contactId) => {
    try {
        const response = await fetch(`${apiUrl}/${contactId}`, {
            method: "DELETE"
        });
        if (!response.ok && response.status !== 204) {
            const errorText = await response.text();
            throw new Error(`API Error ${response.status}: ${errorText}`);
        }
        return response;
    } catch (error) {
        console.error("Error in deleteContactAPI:", error);
        throw error;
    }
};