// adapters/tenantPrismaAdapter.js
import { PrismaAdapter } from "@auth/prisma-adapter";
import { uniqueCoyNumGen } from "@/lib/uniqueCoyNumGen";
import { ObjectId } from "bson";

export function TenantPrismaAdapter(prisma) {
  const baseAdapter = PrismaAdapter(prisma);
  return {
    ...baseAdapter,

    async createUser(userData) {
      const { id, name, email, ...rest } = userData;
      const baseDomain = ".stockiffy.com";

      // Generate unique 10-digit number for company name
      const finalCompanyName = await uniqueCoyNumGen(prisma);
      const domain = `${finalCompanyName}${baseDomain}`;

      // Create company
      const company = await prisma.company.create({
        data: {
          name: finalCompanyName,
          domain,
        },
      });

      const ids = new ObjectId().toHexString();
      // First user = ADMIN
      const role = "ADMIN";

      // Create user WITHOUT providing `id` (MongoDB ObjectId will be auto-generated)
      return prisma.user.create({
        data: {
          id: ids,
          name,
          email,
          companyId: company.id, // must match @db.ObjectId in schema
          role,
          ...rest,
        },
      });
    },
  };
}
