import { GHMember, Member } from '../../types'

export function adaptMember({ login, avatar_url }: GHMember): Member {
  return {
    username: login,
    avatar: avatar_url
  }
}
