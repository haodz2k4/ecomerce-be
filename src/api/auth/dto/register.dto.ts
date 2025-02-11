import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "src/api/users/dto/create-user.dto";


export class RegisterDto extends PartialType(OmitType(CreateUserDto, ['status','roleId'])){

}