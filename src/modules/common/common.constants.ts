export const COMMON_ERROR_SCHEMA = {
  type: 'object',
  properties: {
    serverCode: { type: 'string', example: 'PRO_ERR_101' },
    httpStatusCode: { type: 'number', example: 409 },
    message: { type: 'string', example: 'some error message' },
  },
};

export const COMMON_SUCCESS_OBJECT = {
  serverCode: { type: 'string', example: 'KTO_202' },
  success: { type: 'boolean', example: true },
  message: { type: 'string', example: 'some success message' },
};
