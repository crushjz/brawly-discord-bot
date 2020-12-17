/* eslint-disable functional/no-class */

import { ArgsType, Field, Int } from 'type-graphql'
import { Min, Max } from 'class-validator'

@ArgsType()
export class UserArgs {
  @Field(() => Int)
  @Min(0)
  readonly skip: number = 0

  @Field(() => Int)
  @Min(1)
  @Max(50)
  readonly take: number = 25
}
