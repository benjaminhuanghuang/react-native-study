# React Native Full Course | React Native Full Stack App | Build Business Directory App | Expo Router

https://www.youtube.com/watch?v=MvmKSNdyJ9g

## Setup

```bash
npx create-expo-app@latest business-directory

```

## Clerk

https://clerk.com/docs/quickstarts/expo

Create account

Create application

Install for Expo
```bash
npm install @clerk/clerk-expo
```

Add API key to .env
```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=...
```

## Add clerk provider
```tsx
<ClerkProvider publishableKey={publishableKey}>
</ClerkProvider>
```

