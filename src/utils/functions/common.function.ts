import dayjs from 'dayjs';

export const isFunction = (functionToCheck: any) => {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  );
};

export function numberWithCommas(n: any) {
  if (!n) return 0;
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function numberWithDot(n: any) {
  if (!n) return 0;
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const filterFalsyValue = (data: any) => {
  Object.keys(data)?.forEach((key: any) => {
    if (!!data[key] === false) {
      delete data[key];
    }
  });
};

export const isObjectEmpty = (object: any) => {
  return Object.keys(object).length === 0;
};

export const checkLink = (str: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
};

export const countItemsSameId = (id: string, field: string, array: any[]) => {
  return array.filter((item) => item[field] === id).length;
};

export const extractFileName = (file_name: string) => {
  if (!file_name) return '';
  const parts = file_name.split('_');

  const name = parts.slice(1).join('_');
  return name;
};

export const downloadFile = (url: string, name: string, autoDown?: boolean) => {
  if (autoDown) {
    fetch(url, { method: 'GET' })
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobURL;
        a.style.display = 'none';
        if (name && name.length) a.download = name;
        document.body.appendChild(a);
        a.click();
      })
      .catch((error: any) => console.log('Download Fail!', error));
  } else {
    if (/\.(jpg|jpeg|png|webp|avif|gif|svg|pdf)$/.test(url)) {
      window.open(url, '_blank');
    } else {
      fetch(url, { method: 'GET' })
        .then((response) => response.blob())
        .then((blob) => {
          const blobURL = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = blobURL;
          a.style.display = 'none';
          if (name && name.length) a.download = name;
          document.body.appendChild(a);
          a.click();
        })
        .catch((error: any) => console.log('Download Fail!', error));
    }
  }
};

export const renderDays = (date: string) => {
  switch (dayjs(date).day()) {
    case 0:
      return '일요일';
    case 1:
      return '월요일';
    case 2:
      return '화요일';
    case 3:
      return '수요일';
    case 4:
      return '목요일';
    case 5:
      return '금요일';
    case 6:
      return '토요일';
    default:
      return '';
  }
};

export const subFileName = (path: String) => {
  return path ? path?.substring(path?.lastIndexOf('/') + 1, path?.length) : '';
};

export const disabledTimePicker = (
  startTimeValue: any,
  endTimeValue: any,
  typeField: 'START' | 'END',
) => {
  return {
    disabledHours: () => {
      if (typeField === 'END') {
        if (!startTimeValue || startTimeValue === -1) return [];
        return Array(startTimeValue.hour())
          .fill(0)
          .map((value, index) => index);
      } else {
        if (!endTimeValue || endTimeValue === -1) return [];
        return Array(24 - endTimeValue.hour())
          .fill(0)
          .map((value, index) => endTimeValue.hour() + index + 1);
      }
    },
    disabledMinutes: (selectedHour: number) => {
      if (typeField === 'END') {
        if (
          !selectedHour ||
          !startTimeValue ||
          startTimeValue === -1 ||
          selectedHour !== startTimeValue.hour()
        ) {
          return [];
        } else {
          return Array(startTimeValue.minute())
            .fill(0)
            .map((value, index) => index);
        }
      } else {
        if (
          !selectedHour ||
          !endTimeValue ||
          endTimeValue === -1 ||
          selectedHour !== endTimeValue.hour()
        ) {
          return [];
        } else {
          return Array(60 - endTimeValue.minute())
            .fill(0)
            .map((value, index) => endTimeValue.minute() + index);
        }
      }
    },
  };
};

export function mergeUnique(inputData: any) {
  const mergedData: any = {};

  inputData.forEach((item: any) => {
    const key = item.receiverId;
    if (!mergedData[key]) {
      mergedData[key] = {
        receiverId: item.receiverId,
        lookUpDateList: item.lookUpDateList,
        listPhone: [],
      };
    }
    mergedData[key].listPhone.push({
      name: item.name,
      phone: item.phone,
    });
  });

  return Object.values(mergedData) as any;
}

export function compareTimeWithPresent(input: string) {
  const inputTime = dayjs(input);

  const isPast = inputTime.isBefore(dayjs());

  return isPast;
}

export function isFloat(n: number) {
  return Number(n) === n && n % 1 !== 0;
}
