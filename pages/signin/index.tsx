import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function onSubmit(e: any) {
    e.preventDefault();
    const data = new FormData(e.target);
    const body = Object.fromEntries(data.entries());
    console.log(body);

    const credentials = {
      userId: body.email,
      password: body.password,
    };

    // use signin from next-auth
    await signIn("credentials", { ...credentials, callbackUrl: "/profile" });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-black grid place-items-center h-screen"
    >
      <div className="flex flex-col gap-y-4 max-w-3xl mx-auto">
        <h1>Sign IN</h1>
        <input
          name="email"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
}
