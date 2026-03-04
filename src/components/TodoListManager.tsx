import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ListRenderItem } from 'react-native';

type TodoItem = {
  key: string;
  value: string;
};

const TodoListManager = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = () => {
    if (todo.trim()) {
      setTodos([...todos, { key: Date.now().toString(), value: todo }]);
      setTodo('');
    }
  };

  const removeTodo = (key: string) => {
    setTodos(todos.filter((item) => item.key !== key));
  };

  const renderItem: ListRenderItem<TodoItem> = ({ item }) => (
    <View>
      <Text testID={`todo-text-${item.value}`}>{item.value}</Text>
      <Button
        title="Remove"
        onPress={() => removeTodo(item.key)}
        testID={`remove-todo-button-${item.value}`}
      />
    </View>
  );

  return (
    <View>
      <TextInput
        placeholder="Enter Todo"
        value={todo}
        onChangeText={(text) => setTodo(text)}
        testID="input-todo"
      />
      <Button title="Add Todo" onPress={addTodo} testID="add-todo-button" />
      <FlatList<TodoItem>
        data={todos}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />
    </View>
  );
};

export default TodoListManager;
