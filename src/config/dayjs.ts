import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/es-us.js';
import 'dayjs/locale/zh-cn';

dayjs.extend(localizedFormat);

export default function (locale: string) {
  dayjs.locale(locale);
}
