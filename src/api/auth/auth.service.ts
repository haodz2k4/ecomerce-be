import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.getUserByEmail(email);
        if(!user || !await user.isMatchPassword(password)){
            throw new NotFoundException("Invalid email or password");
        }
        return user;
    }

    async login(loginDto: LoginDto) {
        
    }

    async generateAuthToken() {

        
    }
}
