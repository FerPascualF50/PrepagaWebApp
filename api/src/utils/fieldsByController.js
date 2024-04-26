export const fieldsByController = {
  createUserAuthController: ['userName', 'password', 'firstName', 'lastName'],
  userValidationController: ['userId', 'userName'],
  loginController: ['userName', 'password'],
  forgotPassController: ['userName'],
  passValidationController: ['userName', 'password', 'code'],
  changePassController: ['oldPass', 'newPass'],
};