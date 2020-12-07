/* eslint-disable functional/no-class */

import { InputType, Field } from 'type-graphql'

@InputType()
export class SignupUserInput {
  @Field()
  readonly email: string

  @Field()
  readonly discordToken: string
}

@InputType()
export class UpdateUserInput {
  @Field()
  readonly id: number

  @Field()
  readonly name: string
}
