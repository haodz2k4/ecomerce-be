import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.getUserByEmail(email);
        if(!user || !await user.isMatchPassword(password)){
            throw new NotFoundException("Invalid email or password");
        }
        return user;
    }
}
