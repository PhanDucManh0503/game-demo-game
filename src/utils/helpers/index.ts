import dayjs from 'dayjs';

const dictionaries = {
  en: () => import('@locales/en/common.json').then((module) => module.default),
  ko: () => import('@locales/ko/common.json').then((module) => module.default),
};

const getDictionary = async (locale: 'ko' | 'en') => dictionaries[locale]();

function removeUndefinedAndNull(obj: Object) {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (
      obj[key as keyof Object] !== undefined &&
      obj[key as keyof Object] !== null
    ) {
      result[key as any] = obj[key as keyof Object];
    }
  }

  return result;
}

function debounce(func: any, delay: number = 500) {
  let timeout: any;

  return function executedFunc(...args: any) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, delay);
  };
}

const REQUIRE_ENV = ['NEXT_PUBLIC_API_URL'];

const calcAge = (birthday: string) => {
  if (!birthday) return '';
  return dayjs().year() - dayjs(birthday).year();
};

const splitPhone = (phone: string) => {
  let regex = /(\d{3})(\d{4})(\d{4})/;

  if (phone?.length === 10) {
    regex = /(\d{3})(\d{4})(\d{3})/;
  } else if (phone?.length === 11) {
    regex = /(\d{3})(\d{4})(\d{4})/;
  } else {
    regex = /(\d{4})(\d{4})(\d{4})/;
  }

  return phone.replace(regex, '$1-$2-$3');
};

const convertBlobUrlToFile = async (blobUrl: string, fileName: string) => {
  return fetch(blobUrl)
    .then((response) => response.blob())
    .then((blobData) => {
      const file = new File([blobData], fileName, { type: blobData.type });
      return file;
    })
    .catch((error) => console.error('Error fetching blob data:', error));
};

const dummyRequestUploadFile = ({ onSuccess }: any) => {
  setTimeout(() => {
    onSuccess('ok');
  }, 0);
};

function calculateTimeDifference(start: string, end: string) {
  // Parse the time strings into dayjs objects
  const startTime = dayjs(`2000-01-01T${start}:00`);
  const endTime = dayjs(`2000-01-01T${end}:00`);

  // Calculate the time difference in minutes
  const minutesDiff = endTime.diff(startTime, 'minute');

  return minutesDiff;
}

function uniqueObjects(array: any, key: any) {
  if (!array) return [];
  const uniqueMap = new Map();

  // Loop through the array
  array.forEach((obj: any) => {
    // Use the specified key to determine uniqueness
    const keyValue = obj[key];
    if (!uniqueMap.has(keyValue)) {
      uniqueMap.set(keyValue, obj);
    }
  });

  // Return an array of unique objects
  return Array.from(uniqueMap.values());
}

// true if can attendance
const checkAttendanceTime = (date: any) => {
  if (
    dayjs(date).format('YYYYMM') ===
      dayjs().subtract(1, 'month').format('YYYYMM') &&
    +dayjs().get('date') < 10
  ) {
    return true;
  }

  if (
    dayjs(date).startOf('month').startOf('date') >=
    dayjs().startOf('month').startOf('date')
  ) {
    return true;
  }

  return false;
};

export {
  getDictionary,
  removeUndefinedAndNull,
  REQUIRE_ENV,
  debounce,
  splitPhone,
  calcAge,
  convertBlobUrlToFile,
  dummyRequestUploadFile,
  calculateTimeDifference,
  uniqueObjects,
  checkAttendanceTime,
};
