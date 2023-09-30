import {map} from "lodash";
import React, {FunctionComponent} from 'react';
import { DataFrame, PanelProps, MutableDataFrame } from '@grafana/data';
import { isGrafanaApiInUsage } from "../consts"; 
import './style.less'
import { SimpleModule } from "./SimpleModule";

export const Controller: FunctionComponent<PanelProps> = (props) => {
  const {options} = props;

  const getParsedFrameData = () => {
    const {data: {series}} = props;

    if (isGrafanaApiInUsage) {
      return map(series, (serie: DataFrame, n) => {
        //@ts-ignore
        return new MutableDataFrame(serie).fields[0].values.buffer[0];
        // return return new MutatedDataFrame(serie).toArray()
      })
    } else {
      return series
    }
  }
  
  const datasResult = getParsedFrameData();

  return (
    <div style={{ height: props.height, width: props.width}}>
      <SimpleModule data={datasResult} options={options} />
    </div>
  )
}