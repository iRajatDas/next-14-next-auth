import { getSession } from "next-auth/react";

export default function Profile({ user }: any) {
  // Display user data
  return <div>Welcome {JSON.stringify(user, null, 2)}</div>;
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}
