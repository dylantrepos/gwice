export type CityEventsListHorizontalItemRenderProps = {
  item: any;
  index: number;
}

export type Props = {
  navigation: any;
  route: any;
  title: string;
  handleNavigation: () => void;
  categoryIdList?: number[];
}