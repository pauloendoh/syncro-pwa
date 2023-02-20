export type ProfileDto = {
  userId: string;
  pictureUrl: string;
  fullName: string;
  bio: string;
  websiteUrl: string;
  updatedAt: string;
};

export const buildProfileDto = (p?: Partial<ProfileDto>): ProfileDto => ({
  userId: "",
  pictureUrl: "",
  fullName: "",
  bio: "",
  websiteUrl: "",
  updatedAt: "",
  ...p,
});
