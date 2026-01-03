import { getDashboardData, getLatestRoutine } from '@/lib/api';
import RecommendationUI from './ui';
import { redirect } from 'next/navigation';
import ErrorView from '@/app/components/ErrorView';

export default async function RecommendationPage() {
  const { data: dashboardData, error: dashboardError } =
    await getDashboardData();
  const { data: latestRoutine, error: routineError } = await getLatestRoutine();

  if (dashboardError || routineError) {
    return (
      <ErrorView
        error={dashboardError || routineError}
        redirectPath="/dashboard"
      />
    );
  }

  return (
    <RecommendationUI
      dashboardData={dashboardData || null}
      latestRoutine={latestRoutine || null}
    />
  );
}
