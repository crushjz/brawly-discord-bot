// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export type Environment = {
  readonly production: boolean
  readonly apiUrl: string
}

export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:4200/api',
}
