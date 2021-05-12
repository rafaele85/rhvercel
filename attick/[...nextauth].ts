import NextAuth, {NextAuthOptions, User} from 'next-auth'
import Providers, {CommonProviderOptions} from 'next-auth/providers'
import {Awaitable} from "next-auth/internals/utils";
import Adapters from "next-auth/adapters"
import { PrismaClient } from "@prisma/client"

type IUser = {
    id: number;
    username: string;
    name?: string;
    email: string;
}

const testUser: IUser = {id: 1, username: "john", name: "John", email: "john@gmail.com"}

interface ICredentialInput {
    label?: string
    type?: string
    value?: string
    placeholder?: string
}

interface ICredentialsConfig<C extends Record<string, ICredentialInput> = {}> extends CommonProviderOptions {
    type: "credentials"
    credentials: C
    authorize(credentials: Record<keyof C, string>): Awaitable<User | null>
}

const credOptions: Partial<ICredentialsConfig> = {
    name: 'Reddit',

    credentials: {
        email: {label: "Email", type: "text"},
        password: {label: "Password", type: "password"}
    },

    authorize: async (credentials) => {
        //const user = await User.findOne()

        console.log("credentials = ", credentials)

        const user = await testUser;

        if (user) {
            return user;
        } else {
            return null;
        }
    }
};

const prisma = new PrismaClient();


const options: NextAuthOptions = {
        providers: [
            Providers.Credentials(credOptions),
        ],
        session: {
            jwt: true,
        },
        pages: {
            //signIn: '/signin',
        },

        adapter: Adapters.Prisma.Adapter({ prisma }),
        secret: process.env.JWT_SIGNING_PRIVATE_KEY,
};

export default NextAuth(options);
