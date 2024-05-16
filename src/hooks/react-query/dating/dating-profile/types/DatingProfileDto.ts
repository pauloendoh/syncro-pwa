export interface DatingProfileDto {
  userId: string
  createdAt: string
  updatedAt: string
  photos: any[]
  nickname: string
  gender: DatingGender
  lookingFor: string
  goal: string
  birthdate: string | null
  heightInCm: number | null
  location: string
  aboutMe: string
  topAchievements: string[]
  openToDate: boolean
}

export type DatingGender = 'man' | 'woman' | 'beyondBinary'

export type DatingLookingFor = 'men' | 'women' | 'beyondBinary' | 'everyone'

export type DatingGoal =
  | 'longTermPartner'
  | 'longTermOpenToShort'
  | 'shortTermOpenToLong'
  | 'shortTermFun'
  | 'newFriends'
  | 'stillFiguringItOut'
