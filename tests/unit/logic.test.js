import { describe, it, expect } from 'vitest';
import {
  H, K, VOCAB,
  qPool,
  checkTypeAnswer,
  streakMsg,
  getNextIdx,
  toggleLearnSet,
} from '../../src/logic.js';

// ── Data integrity ────────────────────────────────────────────────────────────

describe('H (hiragana data)', () => {
  it('contains exactly 46 entries', () => {
    expect(H).toHaveLength(46);
  });

  it('has no duplicate characters', () => {
    const chars = H.map(x => x.c);
    expect(new Set(chars).size).toBe(46);
  });

  it('has no duplicate romanizations', () => {
    const roms = H.map(x => x.r);
    // romanizations are not unique (e.g. both し and its alias share 'shi')
    // but every entry must have a non-empty one
    expect(roms.every(r => r && r.length > 0)).toBe(true);
  });

  it('starts with あ/a and ends with ん/n', () => {
    expect(H[0]).toEqual({c: 'あ', r: 'a'});
    expect(H[45]).toEqual({c: 'ん', r: 'n'});
  });
});

describe('K (katakana data)', () => {
  it('contains exactly 46 entries', () => {
    expect(K).toHaveLength(46);
  });

  it('has no duplicate characters', () => {
    const chars = K.map(x => x.c);
    expect(new Set(chars).size).toBe(46);
  });

  it('all entries have non-empty romanization', () => {
    expect(K.every(x => x.r && x.r.length > 0)).toBe(true);
  });

  it('starts with ア/a and ends with ン/n', () => {
    expect(K[0]).toEqual({c: 'ア', r: 'a'});
    expect(K[45]).toEqual({c: 'ン', r: 'n'});
  });

  it('mirrors H in romanizations (same reading order)', () => {
    H.forEach((h, i) => {
      expect(K[i].r).toBe(h.r);
    });
  });
});

describe('VOCAB', () => {
  it('has exactly 5 categories', () => {
    expect(Object.keys(VOCAB)).toHaveLength(5);
  });

  it('contains the expected category names', () => {
    expect(Object.keys(VOCAB)).toEqual([
      'Приветствия', 'Числа', 'Местоимения', 'Глаголы', 'Предметы',
    ]);
  });

  it('every category has at least one word', () => {
    expect(Object.values(VOCAB).every(v => v.length > 0)).toBe(true);
  });

  it('every word has jp, r, and ru fields', () => {
    const words = Object.values(VOCAB).flat();
    expect(words.every(w => w.jp && w.r && w.ru)).toBe(true);
  });

  it('Приветствия has 10 words', () => {
    expect(VOCAB['Приветствия']).toHaveLength(10);
  });

  it('Числа has 12 words (1-10, 100, 1000)', () => {
    expect(VOCAB['Числа']).toHaveLength(12);
  });
});

// ── qPool() ───────────────────────────────────────────────────────────────────

describe('qPool()', () => {
  it("'h' returns 46 items all tagged t:'h'", () => {
    const pool = qPool('h');
    expect(pool).toHaveLength(46);
    expect(pool.every(x => x.t === 'h')).toBe(true);
  });

  it("'k' returns 46 items all tagged t:'k'", () => {
    const pool = qPool('k');
    expect(pool).toHaveLength(46);
    expect(pool.every(x => x.t === 'k')).toBe(true);
  });

  it("'both' returns 92 items", () => {
    const pool = qPool('both');
    expect(pool).toHaveLength(92);
  });

  it("'both' contains hiragana and katakana items", () => {
    const pool = qPool('both');
    expect(pool.filter(x => x.t === 'h')).toHaveLength(46);
    expect(pool.filter(x => x.t === 'k')).toHaveLength(46);
  });

  it('pool items preserve c and r from source data', () => {
    const hPool = qPool('h');
    expect(hPool[0]).toMatchObject({c: 'あ', r: 'a', t: 'h'});

    const kPool = qPool('k');
    expect(kPool[0]).toMatchObject({c: 'ア', r: 'a', t: 'k'});
  });

  it('does not mutate the source H and K arrays', () => {
    const hLenBefore = H.length;
    qPool('both');
    expect(H).toHaveLength(hLenBefore);
  });
});

// ── checkTypeAnswer() ─────────────────────────────────────────────────────────

describe('checkTypeAnswer()', () => {
  it('accepts exact romanization', () => {
    expect(checkTypeAnswer('ka', 'ka')).toBe(true);
    expect(checkTypeAnswer('a', 'a')).toBe(true);
    expect(checkTypeAnswer('n', 'n')).toBe(true);
  });

  it('rejects wrong romanization', () => {
    expect(checkTypeAnswer('ki', 'ka')).toBe(false);
    expect(checkTypeAnswer('sa', 'shi')).toBe(false);
  });

  it('rejects empty input', () => {
    expect(checkTypeAnswer('', 'ka')).toBe(false);
    expect(checkTypeAnswer('   ', 'ka')).toBe(false);
  });

  it('is case-insensitive', () => {
    expect(checkTypeAnswer('KA', 'ka')).toBe(true);
    expect(checkTypeAnswer('Shi', 'shi')).toBe(true);
    expect(checkTypeAnswer('TSU', 'tsu')).toBe(true);
  });

  it('trims surrounding whitespace', () => {
    expect(checkTypeAnswer('  ka  ', 'ka')).toBe(true);
    expect(checkTypeAnswer('\tshi\n', 'shi')).toBe(true);
  });

  // Alias pairs
  it("accepts 'si' as alias for 'shi'", () => {
    expect(checkTypeAnswer('si', 'shi')).toBe(true);
  });

  it("accepts 'shi' as alias for 'si'", () => {
    expect(checkTypeAnswer('shi', 'si')).toBe(true);
  });

  it("accepts 'ti' as alias for 'chi'", () => {
    expect(checkTypeAnswer('ti', 'chi')).toBe(true);
  });

  it("accepts 'chi' as alias for 'ti'", () => {
    expect(checkTypeAnswer('chi', 'ti')).toBe(true);
  });

  it("accepts 'tu' as alias for 'tsu'", () => {
    expect(checkTypeAnswer('tu', 'tsu')).toBe(true);
  });

  it("accepts 'tsu' as alias for 'tu'", () => {
    expect(checkTypeAnswer('tsu', 'tu')).toBe(true);
  });

  it("accepts 'hu' as alias for 'fu'", () => {
    expect(checkTypeAnswer('hu', 'fu')).toBe(true);
  });

  it("accepts 'fu' as alias for 'hu'", () => {
    expect(checkTypeAnswer('fu', 'hu')).toBe(true);
  });

  it('does not accept unrelated aliases', () => {
    expect(checkTypeAnswer('si', 'chi')).toBe(false);
    expect(checkTypeAnswer('hu', 'tsu')).toBe(false);
  });
});

// ── streakMsg() ───────────────────────────────────────────────────────────────

describe('streakMsg()', () => {
  it('returns only the base message for streak 0', () => {
    expect(streakMsg(0, 'Correct!')).toBe('Correct!');
  });

  it('returns only the base message for streak 1', () => {
    expect(streakMsg(1, 'Correct!')).toBe('Correct!');
  });

  it('returns only the base message for streak 2 (threshold is > 2)', () => {
    expect(streakMsg(2, 'Correct!')).toBe('Correct!');
  });

  it('appends fire emoji and count for streak 3', () => {
    const msg = streakMsg(3, 'Correct!');
    expect(msg).toContain('Correct!');
    expect(msg).toContain('🔥');
    expect(msg).toContain('3');
  });

  it('includes the correct streak count for large streaks', () => {
    const msg = streakMsg(42, 'Correct!');
    expect(msg).toContain('42');
    expect(msg).toContain('🔥');
  });

  it('preserves the full base message string', () => {
    const base = '✓ Правильно!';
    expect(streakMsg(5, base)).toContain(base);
  });
});

// ── getNextIdx() ──────────────────────────────────────────────────────────────

describe('getNextIdx()', () => {
  it('advances forward by 1', () => {
    expect(getNextIdx(0, 1, 46)).toBe(1);
    expect(getNextIdx(22, 1, 46)).toBe(23);
  });

  it('goes backward by 1', () => {
    expect(getNextIdx(5, -1, 46)).toBe(4);
    expect(getNextIdx(22, -1, 46)).toBe(21);
  });

  it('wraps forward from last index to 0', () => {
    expect(getNextIdx(45, 1, 46)).toBe(0);
  });

  it('wraps backward from 0 to last index', () => {
    expect(getNextIdx(0, -1, 46)).toBe(45);
  });

  it('works for a length-1 array (always stays at 0)', () => {
    expect(getNextIdx(0, 1, 1)).toBe(0);
    expect(getNextIdx(0, -1, 1)).toBe(0);
  });

  it('works for length-2 arrays', () => {
    expect(getNextIdx(0, 1, 2)).toBe(1);
    expect(getNextIdx(1, 1, 2)).toBe(0);
    expect(getNextIdx(0, -1, 2)).toBe(1);
  });
});

// ── toggleLearnSet() ──────────────────────────────────────────────────────────

describe('toggleLearnSet()', () => {
  it('adds an index to an empty set', () => {
    const result = toggleLearnSet(new Set(), 5);
    expect(result.has(5)).toBe(true);
    expect(result.size).toBe(1);
  });

  it('removes an index that is already present', () => {
    const result = toggleLearnSet(new Set([5]), 5);
    expect(result.has(5)).toBe(false);
    expect(result.size).toBe(0);
  });

  it('re-adds after removal (three consecutive toggles)', () => {
    const s1 = toggleLearnSet(new Set(), 5);
    const s2 = toggleLearnSet(s1, 5);
    const s3 = toggleLearnSet(s2, 5);
    expect(s3.has(5)).toBe(true);
  });

  it('does not mutate the original set', () => {
    const original = new Set([3, 7]);
    toggleLearnSet(original, 3);
    expect(original.has(3)).toBe(true);
    expect(original.size).toBe(2);
  });

  it('preserves other entries when adding', () => {
    const result = toggleLearnSet(new Set([1, 2]), 9);
    expect(result.has(1)).toBe(true);
    expect(result.has(2)).toBe(true);
    expect(result.has(9)).toBe(true);
  });

  it('preserves other entries when removing', () => {
    const result = toggleLearnSet(new Set([1, 2, 3]), 2);
    expect(result.has(1)).toBe(true);
    expect(result.has(3)).toBe(true);
    expect(result.has(2)).toBe(false);
  });

  it('correctly tracks size after adding all 46 kana', () => {
    let learned = new Set();
    for (let i = 0; i < 46; i++) {
      learned = toggleLearnSet(learned, i);
    }
    expect(learned.size).toBe(46);
  });
});
