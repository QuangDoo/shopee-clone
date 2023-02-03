type Role = 'Admin' | 'User';

type User = {
  roles: Role[];
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  date_of_birth?: string;
  avatar?: string;
  address?: string;
  phone?: string;
  updatedAt: string;
  name?: string;
};
