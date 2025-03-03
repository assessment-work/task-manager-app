import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  AddTaskContainer,
  HomeContainer,
  LoginContainer,
  SignupContainer,
  SplashContainer,
  TaskDetailContainer,
} from "@/containers";

import type { RootNavigtionParamList } from "@/types";

const Stack = createNativeStackNavigator<RootNavigtionParamList>();

function RootNavigation() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashContainer}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Group>
        <Stack.Screen name="Login" component={LoginContainer} />
        <Stack.Screen name="Signup" component={SignupContainer} />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen name="Home" component={HomeContainer} />
        <Stack.Screen
          name="AddTask"
          component={AddTaskContainer}
          options={{
            title: "Add Task",
          }}
        />
        <Stack.Screen
          name="TaskDetail"
          component={TaskDetailContainer}
          options={{
            title: "Task Detail",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export { RootNavigation };
