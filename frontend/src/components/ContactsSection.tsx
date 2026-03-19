import { useEffect, useState } from "react";
import { fetchContacts, type ContactListItem } from "../api/contactsApi";

export default function ContactsSection() {
    const [contacts, setContacts] = useState<ContactListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadContacts = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchContacts();
            setContacts(response);
        } catch (err) {
            console.error("fetchContacts failed:", err);
            setError("Kunde inte hämta kontakter.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadContacts();
    }, []);

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-slate-900">Kontakter</h2>
                <p className="text-sm text-slate-500">
                    Kontakter kopplade till kunder
                </p>
            </div>

            {loading && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    Laddar kontakter...
                </div>
            )}

            {error && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            {!loading && !error && contacts.length === 0 && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    Inga kontakter hittades.
                </div>
            )}

            {!loading && !error && contacts.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Kontakt
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Kund
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                E-post
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Telefon
                            </th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200 bg-white">
                        {contacts.map((contact) => (
                            <tr key={contact.contactId} className="hover:bg-slate-50">
                                <td className="px-4 py-3 text-sm text-slate-900">
                                    {contact.firstName} {contact.lastName}
                                </td>
                                <td className="px-4 py-3 text-sm text-slate-700">
                                    {contact.customerName ?? "—"}
                                </td>
                                <td className="px-4 py-3 text-sm text-slate-700">
                                    {contact.mail || "—"}
                                </td>
                                <td className="px-4 py-3 text-sm text-slate-700">
                                    {contact.phoneNumber || "—"}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}