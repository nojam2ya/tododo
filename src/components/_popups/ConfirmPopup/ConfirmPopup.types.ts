import type { ReactNode } from 'react';

export interface ConfirmPopupProps {
  title?: string;
  content?: ReactNode;
  onCancel?: () => void;
  onOk: () => void;
}
