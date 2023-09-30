import { random } from 'lodash';

export const mutateProps = (props) => {
  props.data.series[0].value = random(2000)
}