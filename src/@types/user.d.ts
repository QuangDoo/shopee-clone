type Role = 'Admin' | 'User';

type User = {
  roles: Role[];
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
