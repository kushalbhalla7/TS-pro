import UserModel from '@models/user-model';
import { DatabaseService } from 'src/utils/dbService';

export interface registerUser {
  email: string;
  password: string;
}

class UserService {
  static async saveUser(data: registerUser): Promise<any> {
    return DatabaseService.insertOne({ model: UserModel, data: data });
  }

  static async getUserAuth(condition?: any, projection?: any): Promise<any> {
    return DatabaseService.findOne({
      model: UserModel,
      query: condition,
      projection,
    });
  }
}

export default UserService;
