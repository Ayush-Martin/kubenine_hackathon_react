export interface IUser {
  _id: string;
  username: string;
  name?: string;
}

export interface IMessage {
  _id: string;
  rid: string;
  msg: string;
  ts: string;
  u: IUser;
  _updatedAt: string;
  urls?: { url: string; meta?: Record<string, any> }[];
  mentions?: any[];
  channels?: any[];
  md?: any[];
  t?: string;
  groupable?: boolean;
  drid?: string;
}

export interface IPinnedMessage {
  _id: string;
  rid: string;
  msg: string;
  ts: string; // ISO timestamp
  u: IUser;
  _updatedAt: string; // ISO timestamp
  urls: string[];
  mentions: any[]; // could be typed more strictly if needed
  channels: any[]; // could be typed more strictly if needed
  md: Array<{
    type: string;
    value: Array<{
      type: string;
      value: string;
    }>;
  }>;
  pinned: true;
  pinnedAt: string; // ISO timestamp
  pinnedBy: IUser;
}
