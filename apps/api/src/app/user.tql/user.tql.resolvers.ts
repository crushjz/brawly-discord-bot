/* eslint-disable functional/no-class */

import { UserTql } from './user.tql.types'
import { UserArgs } from './user.tql.args'
import { Resolver, Query, Arg, Mutation, Ctx, Args, Int } from 'type-graphql'
import { SignupUserInput, UpdateUserInput } from './user.tql.inputs'
import type { Context } from '../context.tql'

@Resolver(UserTql)
export class UserResolver {
  @Query(() => UserTql, { nullable: true })
  async user(@Arg('id', () => Int) id: number, @Ctx() { prisma }: Context) {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    return user
  }

  @Query(() => [UserTql])
  async users(@Args() { skip, take }: UserArgs, @Ctx() { prisma }: Context) {
    return await prisma.user.findMany({
      skip,
      take,
    })
  }

  @Mutation(() => UserTql)
  // @Authorized()
  async signupUser(
    @Arg('newUserData') { email, discordToken }: SignupUserInput,
    @Ctx() { prisma }: Context
  ): Promise<UserTql> {
    return prisma.user.create({
      data: {
        email,
        discordToken,
      },
    })
  }

  @Mutation(() => UserTql, { nullable: true })
  // @Authorized()
  async updateUser(
    @Arg('data') { id, name }: UpdateUserInput,
    @Ctx() { prisma }: Context
  ): Promise<UserTql> {
    return prisma.user.update({
      where: { id },
      data: {
        name,
      },
    })
  }

  @Mutation(() => UserTql)
  // @Authorized(Roles.Admin)
  async removeUser(@Arg('id') id: number, @Ctx() { prisma }: Context) {
    return await prisma.user.delete({
      where: { id },
    })
  }
}
