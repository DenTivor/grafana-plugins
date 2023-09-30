import { PanelOptionsEditorBuilder } from "@grafana/data";
import { IPanelSettings } from "../interfaces";
import { DefaultSettings } from "./DefaultSettings";
import { EItemsDirection, EItemsPosition } from "../enums";

// https://grafana.com/docs/grafana/v9.0/packages_api/data/paneloptionseditorbuilder/
// custom option https://grafana.com/developers/plugin-tools/create-a-plugin/extend-a-plugin/custom-panel-option-editors
export const optionsBuilder = (builder: PanelOptionsEditorBuilder<IPanelSettings>) => {
  return (
    builder
      .addTextInput({
        path: "prefixLabel",
        name: "Prefix label",
        description: "Prefix for label",
        category: ['Plugin settings'],
        defaultValue: DefaultSettings.prefixLabel
      })

      .addTextInput({
        path: "postfixLabel",
        name: "Postfix label",
        description: "Postfix for label",
        category: ['Plugin settings'],
        defaultValue: DefaultSettings.postfixLabel
      })

      .addSelect({
        path: 'itemsDirection',
        name: 'Items direction',
        description: 'Default value: column',
        category: ['Plugin settings'],
        settings: {
          options: [
            {value: EItemsDirection.COLUMN, label: 'column'},
            {value: EItemsDirection.ROW, label: 'row'}
          ]
        },
        defaultValue: DefaultSettings.itemsDirection
      })

      .addSelect({
        path: 'itemsPosition',
        name: 'Items position',
        description: 'Default value: center',
        category: ['Plugin settings'],
        settings: {
          options: [
            {value: EItemsPosition.START, label: 'start'},
            {value: EItemsPosition.CENTER, label: 'center'},
            {value: EItemsPosition.END, label: 'end'},
          ]
        },
        defaultValue: DefaultSettings.itemsPosition
      })

      // Value settings
      .addSliderInput({
        path: 'valueFontSize',
        name: 'Value font size',
        description: 'Default: 12',
        category: ['Value settings'],
        settings: {
          min: 4,
          max: 80,
          step: 1
          
        },
        defaultValue: DefaultSettings.valueFontSize
      })

      // Prefix settings
      .addSliderInput({
        path: 'prefixFontSize',
        name: 'Prefix font size',
        description: 'Default: 12',
        category: ['Prefix settings'],
        settings: {
          min: 4,
          max: 80,
          step: 1
          
        },
        defaultValue: DefaultSettings.prefixFontSize
      })

      // Postfix settings
      .addSliderInput({
        path: 'postfixFontSize',
        name: 'Postfix font size',
        description: 'Default: 12',
        category: ['Postfix settings'],
        settings: {
          min: 4,
          max: 80,
          step: 1
          
        },
        defaultValue: DefaultSettings.postfixFontSize
      })
  )
}