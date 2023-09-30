import React, {FunctionComponent} from 'react';
import { IPanelSettings } from '../interfaces';
import { EItemsDirection, EItemsPosition } from '../enums';

interface ISimpleModuleProps {
  data: any;
  options: IPanelSettings
}

export const SimpleModule: FunctionComponent<ISimpleModuleProps> = (props: ISimpleModuleProps) => {
  const { data, options } = props;
  const {
    postfixLabel,
    prefixLabel,
    itemsDirection,
    itemsPosition,
    prefixFontSize,
    postfixFontSize,
    valueFontSize,
  } = options;

  const centerKey = itemsDirection === EItemsDirection.COLUMN ? 'alignItems' : 'justifyContent';
  let centerValue;

  if (itemsPosition === EItemsPosition.CENTER) {
    centerValue = 'center'
  } else if (itemsPosition === EItemsPosition.START) {
    centerValue = 'flex-start'
  } else {
    centerValue = 'flex-end'
  }

  const renderValue = () => (
    <div
      className="d-flex"
      style={{
        fontSize: `${valueFontSize}px`
      }}
    >
      {data}
    </div>
  )

  const renderPrefix = () => (
    <div
      className="d-flex"
      style={{
        fontSize: `${prefixFontSize}px`
      }}
    >
      {prefixLabel}
    </div>
  )
  const renderPostFix = () => (
    <div
      className="d-flex"
      style={{
        fontSize: `${postfixFontSize}px`
      }}
    >
      {postfixLabel}
    </div>
  )

  return (
    <div
      className="d-flex"
      style = {{
        flexDirection: itemsDirection,
        [centerKey]: centerValue
      }}
    >
      {renderPrefix()}
      {renderValue()}
      {renderPostFix()}
    </div>
  )
}