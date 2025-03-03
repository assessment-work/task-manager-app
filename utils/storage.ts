import AsyncStorage from "@react-native-async-storage/async-storage";

import { storageKeys } from "@/constants";

import type { UserDTO } from "@/dtos";

async function setAccessToken(token: string): Promise<void> {
  await AsyncStorage.setItem(storageKeys.AUTH_TOKEN, token);
}

async function getAccessToken(): Promise<string | undefined> {
  return (await AsyncStorage.getItem(storageKeys.AUTH_TOKEN)) ?? undefined;
}

async function setUserProfile(profile: UserDTO): Promise<void> {
  await AsyncStorage.setItem(storageKeys.USER_PROFILE, JSON.stringify(profile));
}

async function getUserProfile(): Promise<UserDTO | undefined> {
  const profileString = await AsyncStorage.getItem(storageKeys.USER_PROFILE);

  const profile = profileString
    ? (JSON.parse(profileString) as UserDTO)
    : undefined;

  return profile;
}

async function clearAll() {
  await AsyncStorage.clear();
}

const storage = {
  setAccessToken,
  getAccessToken,
  setUserProfile,
  getUserProfile,
  clearAll,
};

export { storage };
