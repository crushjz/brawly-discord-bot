/* eslint-disable functional/no-class */
import 'reflect-metadata'
import { IsEmail } from 'class-validator'
import { ObjectType, Field, ID } from 'type-graphql'
import { User } from '../user/user.types'

@ObjectType()
export class UserTql implements User {
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
