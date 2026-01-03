import { getPresetRoutines } from '@/lib/api';
import ProgramSelectionUI from './ui';
import ErrorView from '@/app/components/ErrorView';

export default async function ProgramSelectionPage() {
  const { data: presetRoutines, error: presetRoutinesError } =
    await getPresetRoutines();

  if (presetRoutinesError) {
    return <ErrorView error={presetRoutinesError} redirectPath="/dashboard" />;
  }

  return <ProgramSelectionUI presetRoutines={presetRoutines || []} />;
}
