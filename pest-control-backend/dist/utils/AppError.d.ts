export type ErrorMetadata = Record<string, unknown> | undefined;
export declare class AppError extends Error {
    readonly statusCode: number;
    readonly code: string;
    readonly metadata?: ErrorMetadata;
    constructor({ message, statusCode, code, metadata }: {
        message: string;
        statusCode?: number;
        code?: string;
        metadata?: ErrorMetadata;
    });
}
export declare const isAppError: (error: unknown) => error is AppError;
//# sourceMappingURL=AppError.d.ts.map