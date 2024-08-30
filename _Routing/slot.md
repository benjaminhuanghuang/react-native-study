Just renders the current child route. like children prop in react

```tsx
const RootLayout= ()=>{
    return (
        <>
            <Header/>
            <Slot/>
            <Footer/>
        <>
    )
}
```