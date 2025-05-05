# replace in the link

```js
<Tabs
    screenOptions={{
    headerStyle: {
        backgroundColor: Colors.background,
    },
    headerTintColor: "#fff",
    headerRight: () => (
        <Link href="/" replace>
        <Ionicons name="log-out-outline" size={24} color="#fff" />
        </Link>
    ),
    }}
>
</Tabs>
```

| **Without `replace` (default)**                | **With `replace`**                        |
|------------------------------------------------|-------------------------------------------|
| Adds the new screen to the navigation stack (allows going "Back"). | Replaces the current screen in the stack (disables "Back" option). |
| Similar to `router.push('/login')`.            | Similar to `router.replace('/login')`.    |
| Suitable for normal navigation.                | Useful for auth/logout redirects or onboarding flows. |
