"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const router = useRouter();
  const { login } = useAuth();

  const [userName, setUserName] = useState("mor_2314");
  const [pass, setPass] = useState("83r5^_");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handling login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(userName, pass);
      router.push("/");
    } catch (error) {
      setError("Login gagal, coba lagi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto mt-8 h-max rounded-lg border-4 border-white/15 bg-[#1a1a1a] px-4 py-6 md:max-w-xl lg:max-w-3xl lg:space-y-6">
      <div className="space-y-4 py-6 lg:space-y-6">
        {/* login title */}
        <h1 className="text-center text-4xl font-bold tracking-wider text-purple-500 lg:text-5xl">
          Login
        </h1>
        {/* ./ login title */}

        <form className="" onSubmit={handleLogin}>
          {/* input username & password */}
          <div className="mb-8 space-y-4 md:space-y-6">
            {/* input username */}
            <div className="mx-auto flex flex-col gap-2 md:w-3/5 md:gap-3">
              <label
                htmlFor="username"
                className="font-semibold tracking-wide lg:text-lg"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={userName}
                disabled
                className="rounded-lg bg-[#0a0a0a] px-4 py-2"
              />
            </div>
            {/* ./ input username */}

            {/* input password */}
            <div className="mx-auto flex flex-col gap-2 md:w-3/5 md:gap-3">
              <label
                htmlFor="password"
                className="font-semibold tracking-wide lg:text-lg"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={pass}
                disabled
                className="rounded-lg bg-[#0a0a0a] px-4 py-2"
              />
            </div>
            {/* ./ input password */}
          </div>
          {/* ./ input username & password */}

          {/* Error pop-up */}
          {error && <p className="mb-4 text-center text-red-500">{error}</p>}
          {/* ./ Error pop-up */}

          {/* button login */}
          <div className="mx-auto md:w-3/5">
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer rounded-lg bg-purple-500 py-3 font-semibold text-white lg:text-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          {/* button login */}
        </form>
      </div>
    </main>
  );
}
