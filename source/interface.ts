export interface IResponseBody {
    success: boolean;
    msg: string;
    code: number;
    err?: any;
    entries?: any
}