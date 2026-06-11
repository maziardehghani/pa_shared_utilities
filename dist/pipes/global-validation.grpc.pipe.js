"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
class GrpcValidationPipe extends common_1.ValidationPipe {
    constructor() {
        super({
            whitelist: true,
            transform: true,
            exceptionFactory: (validationErrors) => {
                const errors = validationErrors.reduce((acc, error) => {
                    acc[error.property] = Object.values(error.constraints || {});
                    return acc;
                }, {});
                return new microservices_1.RpcException({
                    statusCode: 400,
                    message: 'Validation failed',
                    errors,
                });
            },
        });
    }
}
exports.GrpcValidationPipe = GrpcValidationPipe;
