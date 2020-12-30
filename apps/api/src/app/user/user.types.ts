export interface User {
  readonly id: number
  readonly email: string
  readonly name: string | null
  readonly discordToken: string
}
