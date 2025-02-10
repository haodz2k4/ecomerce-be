import { OmitType } from "@nestjs/mapped-types";
import { CreateUserDto } from "src/api/users/dto/create-user.dto";


export class RegisterDto extends OmitType(CreateUserDto, ['status','roleId']){

}