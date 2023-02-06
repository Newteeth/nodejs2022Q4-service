
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {

    @IsString()
    readonly login: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}
