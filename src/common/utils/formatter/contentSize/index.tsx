enum DataUnitsConstans {
  B = 'Б',
  KB = 'КБ',
  MB = 'МБ',
  GB = 'ГБ',
}

const formatContentSize = (bytes: number) => {
  switch (true) {
    case bytes < 1024:
      return `${bytes} ${DataUnitsConstans.B}`;
    case bytes < 1024 * 1024:
      return `${(bytes / 1024).toFixed(2)} ${DataUnitsConstans.KB}`;
    case bytes < 1024 * 1024 * 1024:
      return `${(bytes / (1024 * 1024)).toFixed(2)} ${DataUnitsConstans.MB}`;
    default:
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} ${DataUnitsConstans.GB}`;
  }
};

export default formatContentSize;
