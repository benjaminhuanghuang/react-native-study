

```js
import { Link, router, useLocalSearchParams} from "expo-router"

<Link href="/users/1"> Go to user1 </Link>

<Pressable onPress={()=> router.push(`/users/${userId}`)}>
    <Text> go to user 2 </Text>
<Pressable>

<Pressable onPress={()=> router.push({
    pathname: '/users/[id]', 
    params: {id}
})}>
    <Text> go to user 3 </Text>
<Pressable>



// process parameter
const {id} = useLocalSearchParams<{id: string}>();

```