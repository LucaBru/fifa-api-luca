import type { GenericError } from '../GenericError';

class NotFound extends Error {
  jsonError: GenericError;
  constructor(jsonError: GenericError) {
    super(jsonError.message);
    this.jsonError = jsonError;
  }
}

export { NotFound };
