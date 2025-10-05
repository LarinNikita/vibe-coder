export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  template: string;
  user: User;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  starMark: { isMarked: boolean }[];
}
