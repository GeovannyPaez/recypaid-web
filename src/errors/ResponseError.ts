

export enum ResponseErrorType {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  GATEWAY_TIMEOUT = 'GATEWAY_TIMEOUT',
  CONFLICT = 'CONFLICT',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
}


export class ResponseError extends Error {
  constructor(message: string, public type: ResponseErrorType = ResponseErrorType.INTERNAL_SERVER_ERROR) {
    super(message);
  }
}

export const errorAction = (message: string): ActionResponse => {
  return {
    error: true,
    message: message
  }
}

export const successAction = (message: string): ActionResponse => {
  return {
    error: false,
    message: message
  }
}