import { prisma } from "@/lib/prisma"

export default async function OrganizationsPage() {
    const organizations = await prisma.organization.findMany(); 

    return(
        <div>
            <h1>Organizations</h1>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Website</th>
                        <th>Phone</th>
                    </tr>
                </thead>

                <tbody>
                    {organizations.map((organization) => (
                        <tr key={organization.id}>
                            <td>{organization.name}</td>
                            <td>{organization.address}</td>
                            <td>{organization.website}</td>
                            <td>{organization.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <form method="POST" action="/api/organizations">
                <input name="name" placeholder="Name" />
                <input name="address" placeholder="Address" />
                <input name="website" placeholder="Website" />
                <input name="phone" placeholder="Phone" />
                
                <button type="submit">Create</button>
            </form>
        </div>
    )
}