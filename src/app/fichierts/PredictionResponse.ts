
export interface StockData {
    Close: number;
    High: number;
    Low: number;
    Open: number;
  }
  
  export interface PredictionResponse {
    [key: string]: StockData;
  }
  