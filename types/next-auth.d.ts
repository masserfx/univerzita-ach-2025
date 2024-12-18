import "next-auth";

declare module "next-auth" {
  interface User {
    role?: "admin" | "manager" | "employee";
  }
  
  interface Session {
    user: User & {
      role?: "admin" | "manager" | "employee";
    };
  }
}
