import { PartialType, PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";


export class UpdateCurrentUserDto extends PartialType(
    PickType(CreateUserDto,[
        'fullName',
        'gender',
        'birthDate',
        'avatar'
    ])
) {

}