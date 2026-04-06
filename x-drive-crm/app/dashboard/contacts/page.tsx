import { prisma } from "@/lib/prisma"

export default async function ContactsPage() {
    const contacts = await prisma.contact.findMany({
        include: { 
            organization: true,
        }
    }); 

    const organizations = await prisma.organization.findMany();

    return(
        <div>
            <h1>Contacts</h1>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Organization</th>
                    </tr>
                </thead>

                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.firstName} {contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>{contact.organization?.name || "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <form method="POST" action="/api/contacts">
                <input name="firstName" placeholder="First Name" />
                <input name="lastName" placeholder="Last Name"/>
                <input name="email" placeholder="Email" />
                <input name="phone" placeholder="Phone" />
                <input name="title" placeholder="Title" />
                <select name="organizationId">
                    <option value="">Select Organization</option>
                    {organizations.map((organization) => (
                        <option key={organization.id} value={organization.id}>
                            {organization.name}
                        </option>
                    ))}
                </select>
                
                <button type="submit">Create</button>
            </form>
        </div>
    )
}