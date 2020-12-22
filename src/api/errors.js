export class NotFoundError extends Error {
  constructor(...params) {
    super(...params);
    this.code = 404;
  }
}
