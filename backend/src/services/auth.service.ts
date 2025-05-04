import { JWT_EXPIRY, JWT_REFRESH_EXPIRY, JWT_REFRESH_SECRET, JWT_SECRET } from "../config";
import { IUser, User } from "../models/user.model"
import { Types } from "mongoose";
import Jwt from 'jsonwebtoken'

export const login = async (emailId: string, password: string) =>{
    const user = await User.findOne({ emailId: emailId});
    if(user){
        if(user.password === password){
            const [token, refreshToken] = await generateTokens(user)
            await setRefreshToken(user._id as Types.ObjectId, refreshToken, token)

            return ({
                token: token,   
                refreshToken: refreshToken,
                user: user
            })

        }else{
            throw new Error("invalid Password. please try again")
        }
    }else{
        throw new Error("User not found")
    }
}

export const signup = async (
//   req: any,
  emailId: string,
  userName: string,
  country: string,
  password: string
) => {
  const isExists = await checkUserExists(emailId);
  const isUserNameTaken = await checkUserNameExists(userName);
  if (isExists) {
    throw new Error("User already Exists..");
  }

  if (isUserNameTaken) {
    throw new Error("UserName already taken. Try something");
  }

  // if(req.files.length){
  //     const bufferData = req.files[0].buffer;
  //     const mimeType = req.files[0]?.mimetype
  //     const originalFileName = req.files[0].originalname;
  //     const extension = path.extname(originalFileName).slice(1);
  //     const fileName = `${new Date().getTime()}.${extension}`;
  //     const imgPath = path.join(__dirname, '../../public/profile',fileName);
  //     fs.writeFileSync(imgPath, bufferData);

  //     const attachmentData = await storeAttachment(originalFileName, `profile/${fileName}`, mimeType);
  //     // return Blog.create({ title: title, description: description, category: category, slug: slug, author: user._id, heroImg: attachmentData._id  })

  //         const user = await User.create({userName: userName, emailId: emailId, password: password, profile: attachmentData._id})

  //         const [ token, refreshToken] = await generateTokens(user)
  //         await setRefreshToken(user._id as Types.ObjectId, refreshToken)

  //         return ({
  //             token: token,
  //             refreshToken: refreshToken,
  //             user: user,
  //         })

  const user = await User.create({
    emailId: emailId,
    userName: userName,
    country: country,
    password: password,
  });

  const [token, refreshToken] = await generateTokens(user);
  await setRefreshToken(user._id as Types.ObjectId, refreshToken, token);

  return {
    token: token,
    refreshToken: refreshToken,
    user: user,
  };
};
    // else{   
    //     throw new Error("Failed to register User")
    // }
// }

export const checkUserNameExists = async (userName: string) => {
    const user = await User.exists({ userName: userName });
    if (user) return true;
    return false;
}


export const checkUserExists = async (emailid: string) => {
    const user = await User.exists({ emailId: emailid });
    if (user) return true;
    return false;
}



export const getJwtToken = (user: IUser, jwtSecret: string, jwtExpiry: string) => {
    const payload = {
        id: user._id,
        emailId: user.emailId,
    }
    return Jwt.sign({ ...payload }, jwtSecret, { expiresIn: jwtExpiry })
}

const setRefreshToken = async (userId: Types.ObjectId, refreshToken: string, token: string) => {
    await User.findByIdAndUpdate(userId, {
        $set: { refreshToken: refreshToken, token: token }
    })
}

const  generateTokens = async (user: IUser) => {
    const token = getJwtToken(user as IUser, JWT_SECRET, JWT_EXPIRY);
    const refreshToken = getJwtToken(user as IUser, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRY);
    return [token, refreshToken]
}

export const getUserDetailsById = async (userId: string) => {
    return User.findById({ _id: userId }).lean();
}