import {signOut} from 'next-auth/client'

export const Main = () => {
    const handleSignout = async () => {
        await signOut();
    };

    return (
        <div>
            Main
            <button onClick={handleSignout}>SignOut</button>
        </div>
    )
}