interface BetOnStats {
  betOnId: number;
  configId: number;
  userId: number;
  coinId: string;
  type: string;
  standardAt: Date;
  standardPrice: number;
  targetAt: Date;
  targetPrice: number;
  reward: number;
}

interface UpdateBetOnStats {
  id: number[];
  stats: boolean;
}

interface BetOnSetting {
  betOnId: number;
  userId: number;
  configId: number;
  createdAt: Date;
  betTime: number;
  waitTime: number;
}

interface UpdateBetOnSetting {
  configId: number;
  betOnIds: number[];
  standardAt: string;
  targetAt: string;
}

interface BeforeSettlement {
  userId: number;
  betOnId: number;
  reward: number;
}