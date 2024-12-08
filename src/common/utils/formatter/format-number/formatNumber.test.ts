import { formatNumber } from './index';

describe('formatNumber', () => {
  test('Корректное значение', () => {
    expect(formatNumber(1234567)).toBe('1 234 567');
  });

  test('Пограничное значение', () => {
    expect(formatNumber(-1234.56)).toBe('-1 234,56');
  });

  test('Не валидное значение', () => {
    expect(formatNumber(undefined)).toBe('');
  });
});
