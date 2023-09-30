import { EItemsDirection, EItemsPosition } from "../enums";
import { IPanelSettings } from "../interfaces";

export const DefaultSettings: IPanelSettings = {
  prefixLabel: 'Simple string prefix',
  postfixLabel: 'Simple string postfix',
  itemsDirection: EItemsDirection.COLUMN,
  itemsPosition: EItemsPosition.CENTER,
  prefixFontSize: 12,
  postfixFontSize: 12,
  valueFontSize: 12,
}