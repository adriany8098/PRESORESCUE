export enum DeliverySpeed {
  STANDARD = '24-hour Standard',
  EXPRESS = '6-hour Express'
}

export interface PresentationProject {
  id: string;
  topic: string;
  audience: string;
  status: 'Drafting' | 'AI Analyzing' | 'Human Design' | 'Completed';
  deliverySpeed: DeliverySpeed;
  timestamp: number;
}

export interface RescueAdvice {
  hook: string;
  structure: string[];
  designTips: string[];
}