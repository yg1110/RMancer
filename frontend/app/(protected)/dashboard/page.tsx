import { getDashboardData } from '@/lib/api';
import DashboardUI from './ui';
import { toErrorMessage } from '@/shared/enums/utils/error';
import { AlertTriangle } from 'lucide-react';
import { redirect } from 'next/navigation';
interface DashboardPageProps {
  searchParams: Promise<{
    edit?: string;
  }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const isEdit = (await searchParams).edit === 'true';

  const { data: dashboardData, error: dashboardError } =
    await getDashboardData();

  if (
    !isEdit &&
    dashboardData?.latestGoal?.goalType &&
    dashboardData?.latestGoal?.experienceLevel &&
    dashboardData?.latestGoal?.weeklyFrequency
  ) {
    redirect('/recommendation');
  }

  if (dashboardError) {
    return (
      <div className="text-center py-20 px-6 h-full flex flex-col items-center justify-center">
        <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <p className="text-slate-800 font-bold mb-4">
          {toErrorMessage(dashboardError)}
        </p>
      </div>
    );
  }
  return <DashboardUI isEdit={isEdit} />;
}
