'use client';

import { signIn } from 'next-auth/react';
import { Zap } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SigninUI() {
  const router = useRouter();
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
      router.replace('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 h-full">
      <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3">
        <Zap className="size-10 text-white" />
      </div>
      <h1 className="text-3xl font-black text-slate-800 mb-1">RMancer</h1>
      <h2 className="text-xl font-bold text-slate-600 mb-2">
        다시 오신 것을 환영합니다
      </h2>
      <p className="text-slate-500 mb-8 text-center">
        로그인하여 당신의 성장을 추적하세요
      </p>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            이메일
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            placeholder="example@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all"
        >
          로그인
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-slate-500 text-sm">
          계정이 없으신가요?{' '}
          <Link
            href="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            지금 가입하기
          </Link>
        </p>
      </div>
    </div>
  );
}
