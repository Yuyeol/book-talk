import Layout from "@/components/layout";
import { signIn, useSession } from "next-auth/react";
export default function Component() {
  const { data: session } = useSession();

  return (
    <Layout>
      {session ? (
        <>
          <div>{session?.user?.name}</div>
        </>
      ) : (
        <button onClick={() => signIn("google")}>Sign in</button>
      )}
    </Layout>
  );
}
