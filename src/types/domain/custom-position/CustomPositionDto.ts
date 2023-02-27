export interface CustomPositionDto {
  id: string
  syncroItemId: string
  userId: string
  position: number

  createdAt: string
  updatedAt: string
}

export const buildCustomPositionDto = (
  p?: Partial<CustomPositionDto>
): CustomPositionDto => ({
  id: "",
  syncroItemId: "",
  userId: "",
  position: 0,

  createdAt: "",
  updatedAt: "",
  ...p,
})
