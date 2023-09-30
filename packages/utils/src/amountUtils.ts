import Big from 'big.js';

export const getFormattedAmount = (amount: string|number, toFixed: number, sign?: string): string => {
  let result;
  
  if (toFixed === void 0) {toFixed = 2}
  if (amount || Number(amount) === 0) {
    if (typeof amount === 'string') {
      amount = amount.replace(/\s+/g, '');
    }

    result = Big(amount).toFixed(toFixed);
    if (!isNaN(result)) {
      let numArr = result.split('.');
      numArr[0] = numArr[0].toString().replace(/\B(?=(\d3)+(?!\d))/g, String.fromCharCode(160));
      result = numArr.join('.');
    } else {
      result = Big(0).toFixed(toFixed);
    }
  }

  return (sign || '') + (result || '')
}