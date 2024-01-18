import { Image, ImageSourcePropType } from "react-native";

export type City = {
  cityName: string;
  image: {
    homeImage: ImageSourcePropType;
  }
}