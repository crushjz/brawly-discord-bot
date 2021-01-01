import { eLeft, eRight } from '@brawly/w-fp-ts'
import {
  Channel,
  Client,
  Guild,
  GuildChannel,
  GuildMember,
  Message,
  TextChannel,
  User,
} from 'discord.js'
import { ContextErrorType, EitherContext } from './context.types'
import { matchAuthor } from './matchers'

/* eslint-disable functional/no-expression-statement */

// TODO: Create utilities' functions
const clientMock = new Client()
const userMock = new User(clientMock, {
  id: 'user-id',
  username: 'username',
  discriminator: 'user#0000',
  avatar: 'user avatar url',
  bot: false,
})
const guildMock = new Guild(clientMock, {
  unavailable: false,
  id: 'guild-id',
  name: 'mocked js guild',
  icon: 'mocked guild icon url',
  splash: 'mocked guild splash url',
  region: 'eu-west',
  member_count: 42,
  large: false,
  features: [],
  application_id: 'application-id',
  afkTimeout: 1000,
  afk_channel_id: 'afk-channel-id',
  system_channel_id: 'system-channel-id',
  embed_enabled: true,
  verification_level: 2,
  explicit_content_filter: 3,
  mfa_level: 8,
  joined_at: new Date('2018-01-01').getTime(),
  owner_id: 'owner-id',
  channels: [],
  roles: [],
  presences: [],
  voice_states: [],
  emojis: [],
})
const guildMemberMock = new GuildMember(
  clientMock,
  {
    deaf: false,
    mute: false,
    self_mute: false,
    self_deaf: false,
    session_id: 'session-id',
    channel_id: 'channel-id',
    nick: 'nick',
    joined_at: new Date('2020-01-01').getTime(),
    user: userMock,
    roles: [],
  },
  guildMock
)
const channelMock = new Channel(clientMock, {
  id: 'channel-id',
})
const guildChannelMock = new GuildChannel(guildMock, {
  ...channelMock,
  name: 'guild-channel',
  position: 1,
  parent_id: '123456789',
  permission_overwrites: [],
})
const textChannelMock = new TextChannel(guildMock, {
  ...guildChannelMock,
  topic: 'topic',
  nsfw: false,
  last_message_id: '123456789',
  lastPinTimestamp: new Date('2019-01-01').getTime(),
  rate_limit_per_user: 0,
})
const messageMock = new Message(
  clientMock,
  {
    id: 'message-id',
    type: 'DEFAULT',
    content: 'this is the message content',
    author: userMock,
    webhook_id: null,
    member: guildMemberMock,
    pinned: false,
    tts: false,
    nonce: 'nonce',
    embeds: [],
    attachments: [],
    edited_timestamp: null,
    reactions: [],
    mentions: [],
    mention_roles: [],
    mention_everyone: [],
    hit: false,
  },
  textChannelMock
)

test('matchers - matchAuthor() - should match author user when message is from user', () => {
  const context: EitherContext<Record<string, never>> = eRight({
    content: '',
    message: messageMock,
    data: {},
  })

  const result = matchAuthor('user')(context)

  expect(result).toEqual(context)
})

test('matchers - matchAuthor() - should not match author bot when message is from user', () => {
  const context: EitherContext<Record<string, never>> = eRight({
    content: '',
    message: messageMock,
    data: {},
  })

  const result = matchAuthor('bot')(context)

  const expected: EitherContext<Record<string, never>> = eLeft({
    type: ContextErrorType.Match,
  })

  expect(result).toEqual(expected)
})
