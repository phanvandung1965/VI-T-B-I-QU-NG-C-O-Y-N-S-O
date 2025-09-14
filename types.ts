export interface FormState {
  occasion: string;
  promotion: string;
  length: 'short' | 'medium' | 'long' | 'special';
  spinContent: boolean;
  market: 'australia' | 'vietnam';
}

export interface AdCopy {
  title: string;
  content: string;
  hashtags: string;
}
