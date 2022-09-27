import j2s from 'joi-to-swagger';
import fs from 'fs';

export class Swagger {
  currentRoute: any;
  paths: any;
  definitions: any;

  constructor() {
    this.currentRoute = [];
    this.paths = {};
    this.definitions = {};
  }

  static instance() {
    return new Swagger();
  }

  addNewRoute(
    joiDefinitions: any,
    path: any,
    method: any,
    protectedRoute?: boolean
  ) {
    if (this.currentRoute.includes(path + method)) {
      return false;
    }

    this.currentRoute.push(path + method);
    let swaggerData;
    try {
      swaggerData = fs.readFileSync('src/public/swagger.json', 'utf-8');
    } catch (err) {
      fs.writeFileSync('src/public/swagger.json', '', { flag: 'wx' });
    }
    const otherData = swaggerData ? JSON.parse(swaggerData) : {};
    const name = joiDefinitions.model || Date.now();
    const tag = joiDefinitions.group || 'default';
    const summary = joiDefinitions.description || 'No desc';
    const responses = joiDefinitions.responses ? joiDefinitions.responses : [];
    const responseObj: any = {};
    if (responses && responses.length) {
      for (const index in responses) {
        responseObj[responses[index].status] = {
          description: responses[index].description,
          schema: responses[index].schema,
        };
      }
    }

    const toSwagger = j2s(joiDefinitions).swagger;
    if (toSwagger && toSwagger.properties && toSwagger.properties.body) {
      this.definitions = {
        ...this.definitions,
        [name]: toSwagger.properties.body.properties.body,
      };
    }

    const pathArray = path.split('/').filter(Boolean);
    const transformPath = pathArray
      .map((path: string) => {
        if (path.charAt(0) === ':') {
          return `/{${path.substr(1)}}`;
        }
        return `/${path}`;
      })
      .join('');

    const parameters = [];
    const security = [{ authorization: [] }];
    const { body, params, query, headers, formData } = joiDefinitions;

    if (body) {
      parameters.push({
        in: 'body',
        name: 'body',
        // ...toSwagger.properties.body
        schema: {
          $ref: `#/definitions/${name}`,
        },
      });
    }

    if (params) {
      const getParams = [];
      const rxp = /{([^}]+)}/g;
      let curMatch;

      while ((curMatch = rxp.exec(transformPath)) != null) {
        getParams.push(curMatch[1]);
      }
      const requiredFields = toSwagger.properties.params.required;
      getParams.forEach((param) => {
        const index = requiredFields
          ? requiredFields.findIndex((key: any) => key === param)
          : -1;

        if (index > -1) {
          toSwagger.properties.params.properties[param].required = true;
        }
        parameters.push({
          name: param,
          in: 'path',
          ...toSwagger.properties.params.properties[param],
        });
      });
    }

    if (query) {
      const keys = Object.keys(toSwagger.properties.query.properties).map(
        (key) => key
      );
      const requiredFields = toSwagger.properties.query.required;
      keys.forEach((key) => {
        const index = requiredFields
          ? requiredFields.findIndex((requiredKey: any) => requiredKey === key)
          : -1;
        if (index > -1) {
          toSwagger.properties.query.properties[key].required = true;
        }
        parameters.push({
          in: 'query',
          name: key,
          ...toSwagger.properties.query.properties[key],
        });
      });
    }

    if (formData) {
      const keys = Object.keys(toSwagger.properties.formData.properties).map(
        (key) => key
      );
      const requiredFields = toSwagger.properties.formData.required;
      keys.forEach((key) => {
        const index = requiredFields
          ? requiredFields.findIndex((requiredKey: any) => requiredKey === key)
          : -1;
        if (index > -1) {
          toSwagger.properties.formData.properties[key].required = true;
        }
        parameters.push({
          in: 'formData',
          name: key,
          ...toSwagger.properties.formData.properties[key],
        });
      });
    }

    if (headers) {
      const keys = Object.keys(toSwagger.properties.headers.properties).map(
        (key) => key
      );
      const requiredFields = toSwagger.properties.headers.required;
      keys.forEach((key) => {
        const index = requiredFields
          ? requiredFields.findIndex((requiredKey: any) => requiredKey === key)
          : -1;
        if (index > -1) {
          toSwagger.properties.headers.properties[key].required = true;
        }
        parameters.push({
          in: 'header',
          name: key,
          ...toSwagger.properties.headers.properties[key],
        });
      });
    }

    console.log(transformPath);
    if (this.paths && this.paths[transformPath]) {
      this.paths[transformPath] = {
        ...this.paths[transformPath],
        [method]: {
          tags: [tag],
          summary,
          responses: responseObj,
          parameters,
          ...(protectedRoute ? { security } : {}),
        },
      };
    } else {
      this.paths = {
        ...this.paths,
        [transformPath]: {
          [method]: {
            tags: [tag],
            summary,
            responses: responseObj,
            parameters,
            ...(protectedRoute ? { security } : {}),
          },
        },
      };
    }

    const newData = {
      ...otherData,
      definitions: this.definitions,
      paths: this.paths,
    };

    return fs.writeFileSync('src/public/swagger.json', JSON.stringify(newData));
  }

  createJsonDoc(info: any, host?: any, basePath?: any) {
    let swaggerData;
    if (info) {
      swaggerData = {
        ...info,
      };
    }

    if (host) {
      swaggerData = {
        ...host,
      };
    }

    if (basePath) {
      swaggerData = {
        ...basePath,
      };
    }

    return fs.writeFileSync(
      'src/public/swagger.json',
      JSON.stringify(swaggerData)
    );
  }
}
