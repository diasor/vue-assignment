// Deals state
export interface WebSocketState {
  messageList: Message[];
  isConnected: boolean;
  connectionSocket: any;
  currentVehicle: Message;
}

// Deal model
export interface Message {
  time: string;
  energy: string;
  gps: number[];
  odo: string;
  speed: number;
  soc: string;
}
