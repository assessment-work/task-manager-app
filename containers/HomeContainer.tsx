import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeScreen } from "@/screens";

import type { RootNavigtionParamList } from "@/types";

interface HomeContainerProps
  extends NativeStackScreenProps<RootNavigtionParamList, "Home"> {}

function HomeContainer(props: HomeContainerProps) {
  return <HomeScreen />;
}

export type { HomeContainerProps };
export { HomeContainer };
