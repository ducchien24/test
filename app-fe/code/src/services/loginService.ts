import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserSession,
  ISignUpResult,
} from 'amazon-cognito-identity-js';
import { UserPool } from '@/cognito/UserPool';
import { some } from '@/utils/constants/types';
import { AuthenticationCallbackTypes } from '@/utils/constants/variables';

const register = async (Username: string, Password: string, Email: string) => {
  try {
    const result = await new Promise<ISignUpResult>((resolve, reject) => {
      UserPool.signUp(
        Username,
        Password,
        [new CognitoUserAttribute({ Name: 'email', Value: Email })],
        [],
        (err, result) => {
          if (err) {
            reject(err);
          }
          if (result) {
            resolve(result);
          }
        }
      );
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
};

const forgotPassword = async (Username: string) => {
  try {
    const cognitoUser = new CognitoUser({
      Username,
      Pool: UserPool,
    });

    const result = await new Promise<{ result: some; cognitoUser: CognitoUser }>(
      (resolve, reject) => {
        cognitoUser.forgotPassword({
          onSuccess: (result) => resolve({ result, cognitoUser }),
          onFailure: (err) => reject(err),
        });
      }
    );
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
};

const confirmPassword = async (
  cognitoUser: CognitoUser,
  verificationCode: string,
  newPassword: string
) => {
  try {
    const result = await new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: (result) => resolve(result),
        onFailure: (err) => reject(err),
      });
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
};

const authenticate = async (Username: string, Password: string, isRememberMe?: boolean) => {
  try {
    const user = new CognitoUser({
      Username,
      Pool: UserPool,
      Storage: isRememberMe ? undefined : window.sessionStorage,
    });

    const authDetails = new AuthenticationDetails({
      Username,
      Password,
    });

    const result = await new Promise<{
      type: AuthenticationCallbackTypes | 'userNotConfirmedException';
      [key: string]: any;
    }>((resolve, reject) => {
      user.authenticateUser(authDetails, {
        onSuccess: (session) =>
          resolve({
            type: 'onSuccess',
            session,
          }),
        onFailure: (err) => {
          if (err.code === 'UserNotConfirmedException') {
            resolve({
              type: 'userNotConfirmedException',
              user,
            });
          } else {
            reject(err);
          }
        },
        newPasswordRequired: (userAttributes: some, requiredAttributes: some) =>
          resolve({
            type: 'newPasswordRequired',
            userAttributes,
            requiredAttributes,
            user,
          }),
      });
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
};

const getSession = async () => {
  try {
    const user = UserPool.getCurrentUser();
    if (!user) {
      throw new Error('No User!');
    }

    const session = await new Promise<CognitoUserSession>((resolve, reject) => {
      user.getSession((err: Error | null, session: CognitoUserSession | null) => {
        if (err) {
          reject(err);
        }
        if (session) {
          resolve(session);
        }
      });
    });
    return { success: true, data: session };
  } catch (error) {
    return { success: false, error };
  }
};

const logout = () => {
  const user = UserPool.getCurrentUser();
  if (user) {
    user.signOut();
  }
  return { success: true };
};

const changePassword = async (cognitoUser: CognitoUser, userAttr: some, newPassword: string) => {
  try {
    const result = await new Promise((resolve, reject) => {
      cognitoUser.completeNewPasswordChallenge(newPassword, userAttr, {
        onSuccess: (result) => resolve(result),
        onFailure: (err) => reject(err),
      });
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
};

const resendConfirmationCode = async (email: string) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Pool: UserPool,
        Username: email,
      });
      cognitoUser.resendConfirmationCode((err?: Error, result?: some) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
};

const sendMFACode = async (cognitoUser: CognitoUser, confirmationCode: string) => {
  try {
    const result = await new Promise<{
      session: CognitoUserSession;
      userConfirmationNecessary: boolean | undefined;
    }>((resolve, reject) => {
      cognitoUser.sendMFACode(confirmationCode, {
        onSuccess: (session, userConfirmationNecessary) =>
          resolve({ session, userConfirmationNecessary }),
        onFailure: (err) => reject(err),
      });
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
};

const doConfirmRegistration = async (email: string, confirmationCode: string) => {
  try {
    const result = await new Promise<{ success: boolean; message?: string }>((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Pool: UserPool,
        Username: email,
      });
      cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
};

const loginService = {
  register,
  forgotPassword,
  confirmPassword,
  authenticate,
  getSession,
  logout,
  changePassword,
  resendConfirmationCode,
  sendMFACode,
  doConfirmRegistration,
};

export default loginService;
