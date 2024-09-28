class ValidationError extends Error {
    constructor(status, message) {
        super(),
            this.status = status,
            this.name = 'ValidationError',
            this.message = message
    }
};

class NotFoundError extends Error {
    constructor(status, message) {
        super(),
            this.status = status,
            this.name = 'NotFoundError',
            this.message = message
    }
};

class AuthorizationError extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.name = 'AuthorizationError'
        this.message = message
    }
};

class AuthenticationError extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.name = 'AuthenticationError'
        this.message = message
    }
};

class MulterError extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.name = 'MulterError'
        this.message = message
    }
};

class InternalServerError extends Error {
    constructor(status, message) {
        super(),
            this.status = status,
            this.name = 'InternalServerError',
            this.message = message
    }
};

class BadRequestError extends Error {
    constructor(status, message) {
        super(),
            this.status = status,
            this.name = 'BadRequestError',
            this.message = message
    }
};

export default {
    NotFoundError,
    ValidationError,
    AuthorizationError,
    InternalServerError,
    AuthenticationError,
    BadRequestError,
    MulterError
};