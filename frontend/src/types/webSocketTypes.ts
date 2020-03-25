// Deals state
export interface WebSocketState {
  messageList: Message[];
  isConnected: boolean;
  connectionSocket: any;
  currentVehicle: Message;
}

// Deal model
export interface Message {
  time: number;
  parsedTime: string;
  energy: string;
  gps: number[];
  odo: string;
  speed: number;
  soc: string;
}

// Data Model to be shown on the graphs once a vehicle is selected
// export interface GraphData = { id: string; value: string }[];

export interface GraphData {
  id: string;
  value: string;
}
