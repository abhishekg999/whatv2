"use client";
import { createContext } from "react";
import { validateRequest } from "@/auth";
import { type User } from "lucia";

export const UserAuthContext = createContext<User | null>(null);
export function UserAuthProvider({
    children,
    user
}: {
    children: React.ReactNode;
    user: User | null;
}) {
    return (
        <UserAuthContext.Provider value={user}>
            {children}
        </UserAuthContext.Provider>);
}