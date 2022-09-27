export interface IJoiSwaggerSchema {
  body?: any;
  query?: any;
  headers?: any;
  params?: any;
  formData?: any;
  group: string;
  description: string;
  model: string;
  responses?: Array<{ status: number; description: string; schema?: any }>;
}

export interface IAppRoute {
  [x: string]: any;
  path: string;
  method: string;
  joiSchemaForSwagger: IJoiSwaggerSchema;
  handler?: any;
  auth?: boolean;
}
