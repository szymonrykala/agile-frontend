

export class NoValidUserSessionError extends Error {
    message: string = 'No active user session found. Please login again.'
}
