export class HTTPException extends Error {
  public status: number;
  public message: string;
  public name: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.name = "HTTPException";
  }
}
