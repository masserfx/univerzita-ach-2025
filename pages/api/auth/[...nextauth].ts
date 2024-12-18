import NextAuth, { type AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define user types and roles
type Role = "admin" | "manager" | "employee";

// Type for user in session (without password)
interface AppUser extends User {
  role: Role;
}

// Type for stored user data (includes password)
interface StoredUser extends AppUser {
  password: string;
}

const users: Record<string, StoredUser> = {
  "admin@example.com": {
    id: "1",
    name: "Admin",
    email: "admin@example.com",
    role: "admin",
    password: "admin123", // In production, use hashed passwords
  },
  "manager@example.com": {
    id: "2",
    name: "Manager",
    email: "manager@example.com",
    role: "manager",
    password: "manager123",
  },
  "employee@example.com": {
    id: "3",
    name: "Employee",
    email: "employee@example.com",
    role: "employee",
    password: "employee123",
  },
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as AppUser).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as AppUser).role = token.role as Role;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: {
          label: "Heslo",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email a heslo jsou povinné");
        }

        const user = users[credentials.email];

        if (user && user.password === credentials.password) {
          // Create a new object without the password
          const { id, name, email, role } = user;
          return { id, name, email, role };
        }

        throw new Error("Nesprávný email nebo heslo");
      },
    }),
  ],
};

export default NextAuth(authOptions);
