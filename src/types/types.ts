export enum Role {
  NORMAL = "NORMAL",
  BUSINESS = "BUSINESS",
  ADMIN = "ADMIN",
}

export enum VerificationStatus {
  REJECTED = "REJECTED",
  WAITING = "WAITING",
  APPROVED = "APPROVED",
}

export interface User {
  id: string;
  email: string;
  username: string;
  phoneNumber?: string | null;
  address?: string | null;
  role: Role;
  verification?: VerificationStatus | null;
  createdAt?: string;
  updatedAt?: string;
}
