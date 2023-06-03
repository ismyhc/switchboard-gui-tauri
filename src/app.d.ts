// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { ChainData } from './types';

declare global {
  declare namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {}
    // interface Platform {}

    interface LayoutData {
      chainData: ChainData[];
    }
  }
}

declare module '@fortawesome/pro-solid-svg-icons/index.es' {
  export * from '@fortawesome/pro-solid-svg-icons';
}

export {};
