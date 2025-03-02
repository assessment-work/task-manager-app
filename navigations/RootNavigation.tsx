import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  AddTaskContainer,
  HomeContainer,
  LoginContainer,
  SignupContainer,
  TaskDetailContainer,
} from "@/containers";

import type { RootNavigtionParamList } from "@/types";

const Stack = createNativeStackNavigator<RootNavigtionParamList>();

function RootNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="Login" component={LoginContainer} />
        <Stack.Screen name="Signup" component={SignupContainer} />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen name="Home" component={HomeContainer} />
        <Stack.Screen name="AddTask" component={AddTaskContainer} />
        <Stack.Screen name="TaskDetail" component={TaskDetailContainer} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export { RootNavigation };
