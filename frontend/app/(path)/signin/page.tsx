'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert(result.error);
    } else {
      redirect('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">로그인</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 min-w-[300px]"
      >
        <label htmlFor="email">이메일</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="example@example.com"
          className="border-2 border-gray-300 rounded-sm p-2"
        />
        <label htmlFor="password">비밀번호</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          name="password"
          className="border-2 border-gray-300 rounded-sm p-2"
        />

        <button
          type="submit"
          className="bg-green-500 text-white font-bold cursor-pointer rounded-sm p-2"
        >
          로그인
        </button>
        <Link href="/signup" className="text-center">
          회원가입
        </Link>
      </form>
    </div>
  );
}
