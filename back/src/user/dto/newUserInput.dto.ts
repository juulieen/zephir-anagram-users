import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, ValidateIf } from "class-validator";


@InputType()
export class newUserInput {
    @Field()
    @IsEmail()
    @ValidateIf(o => /.*@zefir\.fr/.test(o.email))
    email: string;
}