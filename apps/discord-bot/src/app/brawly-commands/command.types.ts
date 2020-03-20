export const enum CommandType {
  Signup = 'singnup',
}

export type Command = {
  readonly type: CommandType
}

export type SignupCommand = {
  readonly teamName: string
  readonly type: CommandType.Signup
}
