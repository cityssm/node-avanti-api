export interface Configuration {
  base_api_url: string
  client_id: string
  client_secret: string
  username: string
  password: string
  company: string
}

export interface AccessTokenResponse {
  access_token: string
  expires_in: number
  token_type: string
  scope: string
  auth_state: number
  company: string
}

export interface ApiRequestCredentials {
  base_api_url: string
  access_token: string
}