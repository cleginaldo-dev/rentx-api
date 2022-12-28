export interface IUserResponseDTO {
  id: string;
  name: string;
  email: string;
  avatar: string;
  driver_license: string;
  username: string;
  created_at: Date;
  updated_at: Date;
  avatar_url(): string;
}
