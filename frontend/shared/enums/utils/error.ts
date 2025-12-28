export type ApiErrorBody = {
  message?: string | string[];
  error?: string;
  statusCode?: number;
};

export function toErrorMessage(
  e: unknown,
  fallback = '요청 중 오류가 발생했습니다.',
) {
  if (!e) return fallback;
  if (typeof e === 'string') return e;
  if (e instanceof Error) return e.message;

  const msg = (e as any)?.message ?? (e as any)?.response?.data?.message;
  if (typeof msg === 'string') return msg;
  if (Array.isArray(msg)) return msg.join('\n');

  const errText = (e as any)?.error ?? (e as any)?.response?.data?.error;
  if (typeof errText === 'string') return errText;

  try {
    const body = (e as any)?.response?.data ?? e;
    return JSON.stringify(body);
  } catch {
    return fallback;
  }
}
