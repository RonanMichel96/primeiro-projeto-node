import {getRepository} from 'typeorm';
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';

import User from '../models/User'
import authConfig from '../config/auth';

interface Request{
    email: string;
    password: string;
}

interface UserInterface{
    id: string,
    name: string,
    email: string,
    created_at: Date,
    updated_at: Date
}

interface Response{
    user: UserInterface,
    token: string,

}

class AuthenticateUserService{

    public async execute({email, password}: Request): Promise<Response>{
        const userRepository= getRepository(User);
        const user = await userRepository.findOne({ where: {email} });

        if(!user){
            throw  Error('Incorrect email/password combination.');
        }

        const passwordMatched= await compare(password, user.password);

        if(!passwordMatched){
            throw  Error('Incorrect email/password combination.');            
        }

        const {secret, expiresIn}= authConfig.jwt;
        
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        const response= {
            user: {
                id: user.id, 
                name: user.name, 
                email: user.email,
                created_at: user.created_at,
                updated_at: user.updated_at
            }, 
            token
        };

        return response;
    } 
}

export default AuthenticateUserService;