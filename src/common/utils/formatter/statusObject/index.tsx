const formatStatusObject = (statusId?: number) => {
  switch (true) {
    case statusId === 1:
      return 'Планирование ремонта';
    case statusId === 2:
      return 'Черновые работы';
    case statusId === 3:
      return 'Чистовая отделка';
    case statusId === 4:
      return 'Завершающие работы';
    case statusId === 5:
      return 'Завершен';
    default:
      return 'Неизвестный статус';
  }
};

export default formatStatusObject;
