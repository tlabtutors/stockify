export async function uniqueCoyNumGen(prisma) {
  let uniqueNumber = "";
  let exists = true;

  while (exists) {
    uniqueNumber = Math.floor(
      1000000000 + Math.random() * 9000000000
    ).toString(); // 10-digit number

    const company = await prisma.company.findFirst({
      where: { name: uniqueNumber },
    });

    if (!company) exists = false;
  }

  return uniqueNumber;
}
