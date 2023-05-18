import { matchedData } from 'express-validator';
// import { userModel, storeModel, reviewModel } from '../models';
// import { handleHttpError } from '../utils/handleError';
import { encrypt, compare } from '../utils/handlePassword';
import getRamdomAvatarUrl from '../utils/handleRandomAvatar';
import { Request, Response } from 'express';
import handleLogin from '../utils/handleLogin';

// const registerCtrl = async (req:Request, res:Response) => {
//     const body = matchedData(req);
//     // console.log(req);
//     body.password = await encrypt(body.password);
//     // const body = { ...data, password };
//     try {
//         if (body.icon === undefined) {
//             // console.log(req);
//             body.icon = getRamdomAvatarUrl(req);
//         }
//         const user = await userModel.create(body);
//         user.set('password', undefined, { strict: false });
//         // user.set('deleted', undefined, { strict: false });
//         handleLogin(user.toJSON(), res);
//     }
//     catch(err) {
//         console.log(err);
//         handleHttpError(res, 'REPEATED_EMAIL');
//     }
// };

// const loginCtrl = async (req:Request, res:Response) => {
//     const { email, password } = matchedData(req);
//     try {
//         const user = (await userModel.findOne({ email }));
//         // console.log(user);
//         if (await compare(password, user.password)) {
//             user.set('password', undefined, { strict: false });
//             // user.set('deleted', undefined, { strict: false });
//             handleLogin(user.toJSON(), res);
//         }
//         else {
//             handleHttpError(res, 'PASSWORD_INCORRECT');
//         }
//     }
//     catch {
//         handleHttpError(res, 'NOT_REGISTERED');
//     }
// }

// export {registerCtrl, loginCtrl};