import { cookies } from "next/headers";
import styles from "./page.module.css";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthButtonServer from "./components/auth-button/AuthButtonServer";


export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const { data } = await supabase.from('comments').select('*, profiles(*)')

  return (
    <main>
      <AuthButtonServer />
      <p>
        {JSON.stringify(data, null, 2)}
      </p>
    </main>
  );
}
