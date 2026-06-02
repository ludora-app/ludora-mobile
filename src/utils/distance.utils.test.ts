import { convertMToKm } from './distance.utils';

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
