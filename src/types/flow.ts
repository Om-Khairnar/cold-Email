export interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    type?: 'email' | 'delay' | 'source';
    emailSubject?: string;
    emailBody?: string;
    delayTime?: number;
    delayUnit?: 'minutes' | 'hours' | 'days';
    sourceType?: string;
  };
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}