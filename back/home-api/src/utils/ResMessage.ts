export interface ResMessageType {
  success: boolean;
  msg: string;
  errorMsg: string;
  result: any;
}

export class ResMessage {
  static success(result: any, msg?: string): ResMessageType {
    return {
      success: true,
      errorMsg: undefined,
      msg,
      result,
    };
  }

  static successMsg(msg?: string): ResMessageType {
    return ResMessage.success(undefined, msg);
  }

  static error(errorMsg: any, msg?: string): ResMessageType {
    return {
      success: false,
      result: undefined,
      errorMsg,
      msg,
    };
  }
}
