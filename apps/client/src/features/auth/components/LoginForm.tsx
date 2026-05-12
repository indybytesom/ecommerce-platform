"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { login } from "../authSlice";

import { useAppDispatch } from "@/store/hooks";

export default function LoginForm() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      login({
        id: "1",
        name: "John Doe",
        email,
      }),
    );

    router.push("/");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Login</h1>

      <p className="mt-2 text-sm text-gray-500">Welcome back to Ecommerce.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 w-full rounded-xl border px-4 outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12 w-full rounded-xl border px-4 outline-none focus:border-black"
          />
        </div>

        <button className="w-full rounded-xl bg-black py-4 text-white">
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-black">
          Register
        </Link>
      </p>
    </div>
  );
}
