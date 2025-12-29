import { getDashboardData, getLatestRoutine } from '@/lib/api';
import RecommendationUI from './ui';
import { AlertTriangle } from 'lucide-react';
import { toErrorMessage } from '@/shared/enums/utils/error';
import { redirect } from 'next/navigation';

export default async function RecommendationPage() {
  const { data: dashboardData, error: dashboardError } =
    await getDashboardData();
  const { data: latestRoutine, error: routineError } = await getLatestRoutine();
  if (dashboardError || routineError) {
    return (
      <div className="text-center py-20 px-6 h-full flex flex-col items-center justify-center">
        <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <p className="text-slate-800 font-bold mb-4">
          {toErrorMessage(dashboardError || routineError)}
        </p>
        <form
          action={async () => {
            'use server';
            redirect('/dashboard');
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

  return (
    <RecommendationUI
      dashboardData={dashboardData || null}
      latestRoutine={latestRoutine || null}
    />
  );
}
