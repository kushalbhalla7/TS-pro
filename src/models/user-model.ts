import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
} from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({ maxlength: 30, default: '' })
  name: string;

  @prop({
    minLength: 6,
    maxLength: 45,
    lowercase: true,
    unique: true,
    required: true,
  })
  email: string;

  @prop({ minLength: 8, maxLength: 60, required: true })
  password: string;
}

const UserModel = getModelForClass(User);

export default UserModel;
