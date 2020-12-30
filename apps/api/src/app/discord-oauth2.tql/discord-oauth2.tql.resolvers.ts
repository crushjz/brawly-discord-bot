/* eslint-disable functional/no-class */

import { Resolver, Query, Arg, Mutation, Ctx } from 'type-graphql'
import type { Context } from '../context.tql'
import { DiscordAuthPayloadTql } from './discord-oauth2.tql.types'

const getDiscordOAuth2Url = (clientId: string) =>
  `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fauth%2Fredirect&response_type=code&scope=identify%20email%20guilds%20guilds.join`

@Resolver()
export class DiscordOAuth2Resolver {
  @Query(() => String)
  discordOAuth2Url(): string | null {
    const discordClientId = process.env.DISCORD_CLIENT_ID
    return discordClientId ? getDiscordOAuth2Url(discordClientId) : null
  }

  @Mutation()
  // @Authorized(Roles.Admin)
  authorizeWithDiscord(
    @Arg('code') _code: string,
    @Ctx() _ctx: Context
  ): DiscordAuthPayloadTql {
    // TODO: Generate Discord authorization token and store it
    return {
      token: 'new token!',
    }
  }
}
