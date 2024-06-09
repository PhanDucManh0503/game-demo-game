/* eslint-disable no-unused-vars */
interface IUserState {
  user: IStaffDto;
  updateUser: (staff: IStaffDto) => void;
}

interface IStaffDto {
  createdById?: string;
  createdAt?: string;
  updatedById: string;
  updatedAt: string;
  id: string;
  name: string;
  username: string;
  email?: string;
  verifiedEmail?: boolean;
  phoneNum?: string;
  avatarPath?: string;
  avatarName?: string;
  birthday?: string;
  status: string;
  role: string;
  balance: number;
}
