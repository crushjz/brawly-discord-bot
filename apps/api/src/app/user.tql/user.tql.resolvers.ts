/* eslint-disable functional/no-class */

import { User } from './user.tql.types'
import { UserArgs } from './user.tql.args'
import { Resolver, Query, Arg, Mutation, Ctx, Args, Int } from 'type-graphql'
import { SignupUserInput, UpdateUserInput } from './user.tql.inputs'
import type { Context } from '../context.tql'

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg('id', () => Int) id: number, @Ctx() { prisma }: Context) {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    return user
  }

  @Query(() => [User])
  async users(@Args() { skip, take }: UserArgs, @Ctx() { prisma }: Context) {
    return await prisma.user.findMany({
      skip,
      take,
    })
  }

  @Mutation(() => User)
  // @Authorized()
  async signupUser(
    @Arg('newUserData') { email, discordToken }: SignupUserInput,
    @Ctx() { prisma }: Context
  ): Promise<User> {
    return prisma.user.create({
      data: {
        email,
        discordToken,
      },
    })
  }

  @Mutation(() => User, { nullable: true })
  // @Authorized()
  async updateUser(
    @Arg('data') { id, name }: UpdateUserInput,
    @Ctx() { prisma }: Context
  ): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: {
        name,
      },
    })
  }

  @Mutation(() => User)
  // @Authorized(Roles.Admin)
  async removeUser(@Arg('id') id: number, @Ctx() { prisma }: Context) {
    return await prisma.user.delete({
      where: { id },
    })
  }
}
