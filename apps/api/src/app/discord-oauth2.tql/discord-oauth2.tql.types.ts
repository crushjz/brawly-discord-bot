/* eslint-disable functional/no-class */
import 'reflect-metadata'
import { ObjectType, Field } from 'type-graphql'
import { DiscordAuthPayload } from '../discord-oauth2/discord-oauth2.types'

@ObjectType()
export class DiscordAuthPayloadTql implements DiscordAuthPayload {
  @Field()
  readonly token: string
}
