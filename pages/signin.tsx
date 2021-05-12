import { getCsrfToken } from 'next-auth/client'
import {GetServerSidePropsContext} from "next";

interface IProps {
    csrfToken: string;
}

const SignIn = (props: IProps) => {
    return (
        <form method='post' action='/api/auth/callback/credentials'>
            <input name='csrfToken' type='hidden' defaultValue={props.csrfToken}/>
            <label>
                Username
                <input name='username' type='text'/>
            </label>
            <label>
                Password
                <input name='password' type='password'/>
            </label>
            <button type='submit'>Sign in</button>
        </form>
    )
}

export default SignIn;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            csrfToken: await getCsrfToken(context)
        }
    }
}