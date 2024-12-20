const ValidationError = require('./validation.error');
const AuthorizationFailedError = require('./authorization-failed.error');
const ObjectNotFoundError = require('./object-not-found.error');
const AlreadyExistsError = require('./already-exists.error');
const UnknownError =require('./unknown.error');
const ForbiddenError = require('./forbidden.error');
const AuthenticationFailedError = require('./authentication-failed.error');
const NoSuchLinkExist = require('./no-such-link-exist.error');

module.exports = Object.freeze({
  ValidationError,
  AuthorizationFailedError,
  ObjectNotFoundError,
  AlreadyExistsError,
  UnknownError,
  ForbiddenError,
  AuthenticationFailedError,
  NoSuchLinkExist,
});
