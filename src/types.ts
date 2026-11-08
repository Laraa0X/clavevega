export type ActivePage = 'page1' | 'page2' | 'page3';

export interface ClueItem {
  id: string;
  bookNumber: 1 | 2 | 3;
  bookTitle: string;
  title: string;
  description: string;
  secretCode: string;
  unlocked: boolean;
  unlockedAt?: string;
  icon: string;
  visualPreview: string;
}

export interface InvestigationState {
  page1Solved: boolean;
  page1DiscoveredBees: number[];
  page2Solved: boolean;
  page2Levers: number[]; // Positions [0-3] for levers 1,2,3,4
  page3Solved: boolean;
  page3ElementsPlaced: string[];
  guardianName: string;
  soundEnabled: boolean;
}
