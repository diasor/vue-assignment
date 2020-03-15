// Deals state
export interface WebSocketState {
  messageList: Message[];
  isConnected: boolean;
  connectionSocket: any;
}

// Deal model
export interface Message {
  time: string;
  energy: string;
  gps: string[];
  odo: string;
  speed: number;
  soc: string;
}
