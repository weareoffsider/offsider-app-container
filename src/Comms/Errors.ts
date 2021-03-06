export class RequestNotFoundError extends Error {
    public name = "RequestNotFoundError"
    constructor(readonly message: string, public request: XMLHttpRequest) {
      super(message)
    }
}

export class RequestClientError extends Error {
    public name = "RequestClientError"
    constructor(readonly message: string, public request: XMLHttpRequest) {
      super(message)
    }
}

export class RequestForbiddenError extends Error {
    public name = "RequestForbiddenError"
    constructor(readonly message: string, public request: XMLHttpRequest) {
      super(message)
    }
}

export class RequestOfflineError extends Error {
    public name = "RequestOfflineError"
    constructor(readonly message: string, public request: XMLHttpRequest) {
      super(message)
    }
}

export class RequestServerError extends Error {
    public name = "RequestServerError"
    constructor(readonly message: string, public request: XMLHttpRequest) {
      super(message)
    }
}
