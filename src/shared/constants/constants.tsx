export const KO_DATE_FORMAT = 'YYYY년 MM월 DD일 (dddd)';
export const FULL_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT = 'YYYY-MM-DD';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
  NONE: null,
} as const;

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];
