export class DatabaseService {
  static async insertOne({
    model,
    data,
  }: {
    model: any;
    data: any;
  }): Promise<any> {
    return model.create(data);
  }

  static async findOne({
    model,
    query,
    projection,
  }: {
    model: any;
    query: any;
    projection: any;
  }): Promise<any> {
    return model.findOne(query, projection);
  }
}
