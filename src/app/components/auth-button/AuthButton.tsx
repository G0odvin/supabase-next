'use client'

import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";
import { FC } from "react";


const AuthButton:FC<{ session: Session | null }> = ({ session }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  // const [session, setSession] = useState<Session | null>(null);

  // useEffect(() => {
  //   async function getSession() {
  //     const { data } = await supabase.auth.getSession();

  //     setSession(data.session || null);
  //   };

  //   getSession();
  // }, [])

  const onLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  const onLogOut = async () => {
    await supabase.auth.signOut()
    router.refresh();
  }

  return (
    <div>
      {session
        ? <button onClick={onLogOut}>Logout</button>
        : <button onClick={onLogin}>Login</button>
      }

    </div>
  )
}

export default AuthButton