class AlreadyExists extends Error {
  constructor(errorCode, message, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AlreadyExists);
    }

    this.name = 'AlreadyExist';
    this.httpStatusCode=409;
    this.errorCode = errorCode ? errorCode : 'EX-00004';
    this.date = new Date();
    this.message = message ? message : 'Something went wrong';
  }
}
module.exports=AlreadyExists;
