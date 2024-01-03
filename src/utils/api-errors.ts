export class ApiError extends Error {
  public readonly statusCode: number

  // eslint-disable-next-line no-useless-constructor
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

//  Indica que a solicitação não pode ser processada devido
//   a erros do cliente, como dados ausentes ou mal formatados.
export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400)
  }
}

// Indica que a autenticação é necessária e falhou ou não foi
//  fornecida. Geralmente usado para solicitações de login sem
//  credenciais válidas.
export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401)
  }
}

// Pode ser usado para indicar que a solicitação de criação
//  de conta entra em conflito com um recurso existente,
//  por exemplo, se o email já estiver em uso.
export class ConflictError extends ApiError {
  constructor(message: string) {
    super(message, 409)
  }
}
