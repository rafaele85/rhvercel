import {PrismaClient} from "@prisma/client";

import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient();
};

export default handler;