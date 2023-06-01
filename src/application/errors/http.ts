export class ServerError extends Error {
  constructor(error?: Error) {
    super('Server failed. Try again soon');
    this.name = 'ServerError';
    this.stack = error instanceof Error ? error.stack : undefined;
  }
}

export class RequiredFieldError extends Error {
  constructor(fieldName: string) {
    super(`The field ${fieldName} is required`);
    this.name = 'RequiredFieldError';
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized Error');
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Error {
  constructor() {
    super('Access Denied');
    this.name = 'ForbiddenError';
  }
}
