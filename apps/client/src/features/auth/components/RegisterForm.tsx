"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { login } from "../authSlice";

import { useAppDispatch } from "@/store/hooks";

export default function RegisterForm() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      login({
        id: "1",
        name,
        email,
      }),
    );

    router.push("/");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Register</h1>

      <p className="mt-2 text-sm text-gray-500">
        Create your Ecommerce account.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="h-12 w-full rounded-xl border px-4 outline-none focus:border-black"
          />
        </div>

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
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-black">
          Login
        </Link>
      </p>
    </div>
  );
}
