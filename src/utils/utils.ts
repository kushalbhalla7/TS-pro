export default class Utils {
  static successResponse({
    serverCode,
    message,
    result,
  }: {
    serverCode: string;
    message: string;
    result?: any;
  }) {
    return {
      serverCode,
      success: true,
      message,
      ...(result ? { result } : {}),
    };
  }
}
