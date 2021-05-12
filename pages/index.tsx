import { useSession} from 'next-auth/client'
import {Main} from "../components/main";
import {signIn} from 'next-auth/client'

export default function Home() {
  const [ session, loading ] = useSession();

  const handleClick = async () => {
      await signIn();
  };

  if(session) {
    return (
        <Main />
    );
  }
  return (
      <>
        Not signed in <br />
        <button onClick={handleClick}>Sign In</button>
      </>
  );
}



