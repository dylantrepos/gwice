import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
  useFonts
} from '@expo-google-fonts/poppins';

export const useCustomFont = (): boolean => {
  const [fontsLoaded] = useFonts({
    Poppins_100: Poppins_100Thin,
    Poppins_100_Italic: Poppins_100Thin_Italic,
    Poppins_200: Poppins_200ExtraLight,
    Poppins_200_Italic: Poppins_200ExtraLight_Italic,
    Poppins_300: Poppins_300Light,
    Poppins_300_Italic: Poppins_300Light_Italic,
    Poppins_400: Poppins_400Regular,
    Poppins_400_Italic: Poppins_400Regular_Italic,
    Poppins_500: Poppins_500Medium,
    Poppins_500_Italic: Poppins_500Medium_Italic,
    Poppins_600: Poppins_600SemiBold,
    Poppins_600_Italic: Poppins_600SemiBold_Italic,
    Poppins_700: Poppins_700Bold,
    Poppins_700_Italic: Poppins_700Bold_Italic,
    Poppins_800Bold: Poppins_800ExtraBold,
    Poppins_800_Italic: Poppins_800ExtraBold_Italic,
    Poppins_900: Poppins_900Black,
    Poppins_900_Italic: Poppins_900Black_Italic
  });

  return fontsLoaded;
};
