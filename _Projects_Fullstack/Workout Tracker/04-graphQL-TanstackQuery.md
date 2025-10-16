# graphql

## IBM StepZen - a GraphQL server

Exercises API: <https://api-ninjas.com/api/exercises>

Use IBM StepZen to create a GraphQL API: <https://dashboard.ibm.stepzen.com/login>

<https://dashboard.stepzen.com/>

```sh
npm i -g stepzen 

stepzen login
```

Convert Restful API to GraphQL

```sh
cd api
stepzen import curl https://api.api-ninjas.com/v1/exercises\?muscle\=chest -H "'X-API-KEY': xxxxxxxx"
```

Endpoint: api/soft-manatee

## Query

```sh

npm i graphql graphql-request


npm i @tanstack/react-query

```

```js
  <QueryClientProvider client={client}>
    <Stack>
    <Stack.Screen name="index" options={{ title: "Exercises" }} />
    </Stack>
</QueryClientProvider>
```

```js
  const { name } = useLocalSearchParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["exercises", name],
    queryFn: () => graphqlClient.request(exerciseQuery, { name }),
  });
```

graphqlClient.ts
