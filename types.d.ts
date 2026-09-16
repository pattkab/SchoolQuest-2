import "next-auth";

declare module "next-auth" {
  interface User {
    phone?: string;
    role?: string;
  }
  interface Session {
    user: User & {
      id?: string;
      phone?: string;
      role?: string;
    };
  }
}
