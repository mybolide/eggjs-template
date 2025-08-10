/**
 * 错误处理工具类
 * 用于抛出标准化的错误
 */
class AppError extends Error {
  constructor(message, status = 500, code = 0) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.code = code;
  }
}

/**
 * 业务错误类
 */
class BusinessError extends AppError {
  constructor(message, status = 400) {
    super(message, status, 0);
    this.name = 'BusinessError';
  }
}

/**
 * 参数验证错误类
 */
class ValidationError extends AppError {
  constructor(message, status = 400) {
    super(message, status, 0);
    this.name = 'ValidationError';
  }
}

/**
 * 权限错误类
 */
class AuthError extends AppError {
  constructor(message = '权限不足', status = 403) {
    super(message, status, 0);
    this.name = 'AuthError';
  }
}

/**
 * 资源不存在错误类
 */
class NotFoundError extends AppError {
  constructor(message = '资源不存在', status = 404) {
    super(message, status, 0);
    this.name = 'NotFoundError';
  }
}

module.exports = {
  AppError,
  BusinessError,
  ValidationError,
  AuthError,
  NotFoundError
}; 