export interface ContentDto {
  id: number
  videoTitle: string
  videoUrl: string
  comment: string
  rating: number
  thumbnailUrl: string
  creatorName: string
  creatorUrl: string
  postedBy: UserDto
  createdAt: string
  updatedAt: string
}

export interface UserDto {
  id: string
  username: string
  name: string
  registeredAt: string
}

export interface CredentialDto {
  accessToken: string
}

export interface ErrorDto {
  statusCode: number
  message: string
  error: string
}
