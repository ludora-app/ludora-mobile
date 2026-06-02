import { convertMToKm, formatDistance } from './distance.utils';

/**
 * Regression test for the "0 km" distance bug.
 *
 * `convertMToKm` is rendered directly in the field card as `${convertMToKm(d)} km`.
 * With the original `Math.round(m / 1000)` implementation, every distance below
 * 500 m collapsed to `0` (a field 400 m away showed "0 km") and all decimals were
 * lost (1 400 m showed "1 km"). The conversion must keep one decimal of precision.
 */
describe('convertMToKm', () => {
  it('keeps sub-kilometre distances visible instead of rounding them to 0', () => {
    expect(convertMToKm(400)).toBe(0.4);
    expect(convertMToKm(50)).toBe(0.1);
  });

  it('preserves one decimal of precision for distances over 1 km', () => {
    expect(convertMToKm(1400)).toBe(1.4);
    expect(convertMToKm(2550)).toBe(2.6);
  });

  it('returns whole numbers without spurious decimals', () => {
    expect(convertMToKm(0)).toBe(0);
    expect(convertMToKm(1000)).toBe(1);
    expect(convertMToKm(12000)).toBe(12);
  });
});

describe('formatDistance', () => {
  it('shows distances under 1 km in meters, rounded to the nearest 10 m', () => {
    expect(formatDistance(400)).toEqual({ unit: 'm', value: 400 });
    expect(formatDistance(347)).toEqual({ unit: 'm', value: 350 });
    expect(formatDistance(50)).toEqual({ unit: 'm', value: 50 });
  });

  it('switches to kilometers at 1 km and above', () => {
    expect(formatDistance(1000)).toEqual({ unit: 'km', value: 1 });
    expect(formatDistance(1400)).toEqual({ unit: 'km', value: 1.4 });
    expect(formatDistance(12000)).toEqual({ unit: 'km', value: 12 });
  });

  it('promotes a value that rounds up to 1000 m into kilometers', () => {
    expect(formatDistance(999)).toEqual({ unit: 'km', value: 1 });
  });
});
