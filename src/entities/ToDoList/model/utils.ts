import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const convertToDatetimeLocal = (input: string) => {
  const parsed = dayjs(input, 'YYYY.MM.DD AHH:mm');
  return parsed.format('YYYY-MM-DDTHH:mm');
};
