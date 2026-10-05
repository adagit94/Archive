export class CodeError extends Error {
  constructor(code: number) {
    super()
    this.code = code;
  }

  public code: number;
}
