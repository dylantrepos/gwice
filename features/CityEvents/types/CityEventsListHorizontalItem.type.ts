export interface CityEventsListHorizontalItemRenderProps {
  item: any;
  index: number;
}

export interface Props {
  title: string;
  handleNavigation: () => void;
  categoryIdList?: number[];
}
