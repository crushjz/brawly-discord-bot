/* eslint-disable functional/no-class */
import 'reflect-metadata'
import { IsEmail } from 'class-validator'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class User {
  @Field(() => ID)
  readonly id: number

  @Field()
  @IsEmail()
  readonly email: string

  @Field(() => String, { nullable: true })
  readonly name: string | null

  @Field()
  readonly discordToken: string
}
