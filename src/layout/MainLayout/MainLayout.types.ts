import type { RefObject } from 'react';

/* 메인 레이아웃 outlet context */
export interface MainLayoutOutletContext {
  containerRef: RefObject<HTMLDivElement | null>;
}
