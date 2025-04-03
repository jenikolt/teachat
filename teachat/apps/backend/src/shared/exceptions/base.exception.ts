export abstract class BaseException {
  protected constructor(
    protected readonly status: number,
    protected readonly message: string,
  ) {}

  getStatus() {
    return this.status;
  }

  getMessage() {
    return this.message;
  }
}
