import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function OpportunitiesPage() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/auth/login")
    }

    const opportunities = await prisma.opportunity.findMany({
        include: { 
            organization: true,
        }
    }); 

    const organizations = await prisma.organization.findMany();

    return(
        <div>
            <h1>Opportunities</h1>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Organization</th>
                    </tr>
                </thead>

                <tbody>
                    {opportunities.map((opportunity) => (
                        <tr key={opportunity.id}>
                            <td>{opportunity.organization?.name || "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <form method="POST" action="/api/opportunity">
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