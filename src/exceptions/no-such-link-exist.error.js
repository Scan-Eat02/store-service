class NoSuchLinkExist extends Error {
  constructor(errorCode, message, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoSuchLinkExist);
    }

    this.name = 'NoSuchLinkExist';
    this.httpStatusCode=404;
    this.errorCode = errorCode ? errorCode : 'EX-00008';
    this.date = new Date();
    this.message = message ? message : 'Something went wrong';
  }
}
module.exports=NoSuchLinkExist;
