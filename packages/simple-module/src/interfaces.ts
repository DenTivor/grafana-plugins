import { EItemsDirection, EItemsPosition } from "./enums";

export interface IPanelSettings {
  prefixLabel: string;
  postfixLabel: string;
  itemsDirection: EItemsDirection;
  itemsPosition: EItemsPosition;
  prefixFontSize: number;
  postfixFontSize: number;
  valueFontSize: number;
}