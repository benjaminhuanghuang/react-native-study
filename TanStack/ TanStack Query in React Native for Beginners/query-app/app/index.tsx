import { Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { fetchTodos, Todo } from "../api/todo"; // Adjust the import path as necessary
import { FlatList } from "react-native-gesture-handler";

export default function Index() {
  const query = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
  return (
    <View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}
