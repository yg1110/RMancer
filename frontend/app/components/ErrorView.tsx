import { toErrorMessage } from '@/shared/enums/utils/error';
import { AlertTriangle } from 'lucide-react';
import { redirect } from 'next/navigation';

type ErrorViewProps = {
  error: unknown;
  redirectPath: string;
};
function ErrorView({ error, redirectPath }: ErrorViewProps) {
  return (
    <div className="text-center py-20 px-6 h-full flex flex-col items-center justify-center">
      <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-4" />
      <p className="text-slate-800 font-bold mb-4">{toErrorMessage(error)}</p>
      <form
        action={async () => {
          'use server';
          redirect(redirectPath);
        }}
      >
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
        >
          이전 화면으로 돌아가기
        </button>
      </form>
    </div>
  );
}

export default ErrorView;
