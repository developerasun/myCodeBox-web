import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsNumberString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./createAddress.dto";

export class CreateCustomerDto {
    // request body

    @IsNumberString()
    id:number ;

    @IsEmail()
    email: string;

    @IsNotEmpty() // not isNotEmpty
    name : string;

    @IsNotEmptyObject()
    @ValidateNested()
    @Type(()=>CreateAddressDto)
    address : CreateAddressDto
}