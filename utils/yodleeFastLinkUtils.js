import { EMPTY_STRING } from '../config/properties';
import cms from '../config/messages';

export function createFastLinkExtraParams(origin) {
  const callback = origin ?
    `callback=${origin}/connect-complete` :
    EMPTY_STRING;
  return `${callback}`;
}

export function checkForFastLinkError(yodleeResponse) {
  if (yodleeResponse) {
    const json = JSON.parse(yodleeResponse);
    const status = !json.find(item => item.status === 1);
    return status;
  }
  return true;
}

export function parseFastLinkMessages(yodleeResponse) {
  if (yodleeResponse) {
    const json = JSON.parse(yodleeResponse);
    return json.map((item) => {
      const { status, bankName } = item;
      if (status !== 1) {
        return cms['fastlink.complete.text.error'](bankName);
      }
      return cms['fastlink.complete.text.success'](bankName);
    });
  }
  return [cms['fastlink.complete.error']];
}
