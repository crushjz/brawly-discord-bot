import { gql, useQuery } from '@apollo/client'
import { Button } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

const Hero = styled.div`
  width: 100%;
  text-align: center;
`

const Anchor = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a {...props}>{props.children}</a>
)

export const Home = () => {
  const { data: discordOAuth2UrlPayload } = useQuery<{
    readonly discordOAuth2Url: string
  }>(gql`
    query {
      discordOAuth2Url
    }
  `)

  const discordOAuth2Url = discordOAuth2UrlPayload
    ? discordOAuth2UrlPayload.discordOAuth2Url
    : ''

  return (
    <>
      <header>
        <Button
          as={Anchor}
          disabled={!discordOAuth2UrlPayload}
          href={discordOAuth2Url}
          target="_blank"
        >
          Login
        </Button>
      </header>
      <Hero>
        <h1>Welcome</h1>
        <p>Very cool</p>
        <Button
          as={Anchor}
          disabled={!discordOAuth2UrlPayload}
          href={discordOAuth2Url}
          target="_blank"
        >
          Add to Discord
        </Button>
      </Hero>
    </>
  )
}

export default Home
