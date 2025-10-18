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
  md?: IMessageContent[];
  t?: string;
  groupable?: boolean;
  drid?: string;
}

export interface IMessageContent {
  type: string;
  value: IMessageValue[] | IMessageLink | string;
}

export interface IMessageValue {
  type: string;
  value: string | IMessageValue[];
}

export interface IMessageLink {
  src: IMessageValue;
  label: IMessageValue[];
}

export interface IRoom {
  _id: string;
  t: "c" | "d" | "p"; // channel , dm , private group
  name?: string;
  usernames?: string[];
  usersCount: number;
  msgs: number;
  ts: string;
  uids?: string[];
  default: boolean;
  ro?: boolean;
  sysMes?: boolean;
  _updatedAt: string;
  lm?: string;
  lastMessage?: IMessage;
  u?: IUser;
}
