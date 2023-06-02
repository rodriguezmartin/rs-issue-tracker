import { Member } from '../../types'

export function adaptMember({ login, avatar_url }: Member) {
  return {
    username: login,
    avatar: avatar_url
  }
}
