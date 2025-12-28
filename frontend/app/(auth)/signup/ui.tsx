'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import { signUp } from '@/app/actions/auth-actions';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';

export default function SignupUI() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const result = await signUp({
      email,
      password,
      name,
    });
    if (result?.status === 'ok') {
      redirect('/signin');
    }

    if (result?.message) {
      alert(result.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="bg-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg -rotate-3">
        <UserPlus className="size-10 text-white" />
      </div>
      <h1 className="text-3xl font-black text-slate-800 mb-1">RMancer</h1>
      <h2 className="text-xl font-bold text-slate-600 mb-2">새로운 시작</h2>
      <p className="text-slate-500 mb-8">오늘부터 당신의 변화를 시작하세요</p>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            이름
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="홍길동"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            이메일 주소
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
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
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="••••••••"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            비밀번호 확인
          </label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 bg-emerald-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-100 hover:bg-emerald-600 active:scale-[0.98] transition-all"
        >
          회원가입 완료
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-slate-500 text-sm">
          이미 계정이 있으신가요?{' '}
          <Link
            href="/signin"
            className="text-emerald-600 font-semibold hover:underline"
          >
            로그인하기
          </Link>
        </p>
      </div>
    </div>
  );
}
