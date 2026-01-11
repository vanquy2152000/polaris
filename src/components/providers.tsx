"use client";

import {
    Authenticated,
    Unauthenticated,
    AuthLoading,
    ConvexReactClient
} from "convex/react";
import {
    ClerkProvider,
    useAuth,
    UserButton
} from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ThemeProvider } from './theme-provider';
import { dark } from '@clerk/themes';
import UnauthenticationView from '../features/auth/unauthentication-view';
import { AuthLoadingView } from './auth-loading-view';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider appearance={{
            theme: dark
        }}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Authenticated>
                        <UserButton />
                    </Authenticated>
                    <Unauthenticated>
                        <UnauthenticationView />
                    </Unauthenticated>
                    <AuthLoading>
                        <AuthLoadingView />
                    </AuthLoading>
                    {children}
                </ThemeProvider>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}