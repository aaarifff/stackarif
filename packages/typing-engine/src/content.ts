import type { Config } from './types';
import { PASSAGES, VOCABULARY } from './passages';

// Independently curated vocabulary. See WORD-LIST.md for provenance and license.
export const WORDS = `about above across act add after again air all almost along also always among an and animal another answer any appear apple are area arm around art as ask at away back bad ball bank base be bear beautiful became because become bed been before began begin behind being below best better between big bird black blue boat body book both box boy bring brought build built busy but buy by call came can car care carry case cat cause center certain change check child city class clear close cold color come common complete could country course cut dark day deep develop did different do does dog done door down draw dream drive dry during each early earth east easy eat end enough even ever every example eye face fact fall family far farm fast father feel feet few field find fine fire first fish five floor flower fly follow food foot for form found four free friend from front full game garden gave get girl give go gold good got great green ground group grow had half hand hard has have he head hear heart heat heavy help her here high hill him his hold home hope horse hot hour house how hundred idea if important in inch include into is island it its job join just keep kind king knew know land language large last late later laugh learn leave left less let letter life light like line list little live long look love low made make man many map mark may mean measure men might mile mind miss money month moon more morning most mother mountain move much music must my name near need never new next night no north note nothing now number of off often old on once one only open or order other our out over own page paper part pass past path pattern people perhaps person picture place plain plan plant play point power pretty problem put question quick quiet rain ran read ready real red remember rest right river road rock room round rule run said same saw say school sea second see seem sentence set several shall shape she ship short should show side simple since sing sit six size sleep small snow so some something song soon sound south space special spring stand star start state stay step still stone stop story street strong study such sun sure table take talk tall tell ten test than that the their them then there these they thing think third this those though thought thousand three through time to together told too took top toward town tree true try turn two under understand until up us use usual very voice walk want warm was watch water way we well went were west what when where which while white who whole why wide will wind window with without woman wonder wood word work world would write year yellow yes yet you young your`.split(/\s+/);

export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function punctuate(word: string, random: () => number): string {
  switch (Math.floor(random() * 4)) {
    case 0: return word.charAt(0).toUpperCase() + word.slice(1);
    case 1: return word + ',';
    case 2: return word + '.';
    default: return '"' + word + '"';
  }
}
export function generate(config: Config, count: number, random: () => number, previous = '', offset = 0, passageIndex = 0): string[] {
  const result: string[] = [];
  const passages = config.category !== 'common' ? PASSAGES[config.category][config.level] : null;
  const passage = passages ? (passages[passageIndex % passages.length] ?? '').split(/\s+/) : null;
  const vocabulary = config.level === 'normal' ? WORDS : VOCABULARY[config.level];
  for (let i = 0; i < count; i++) {
    let index = Math.floor(random() * vocabulary.length);
    if (vocabulary[index] === previous) index = (index + 1) % vocabulary.length;
    let word = passage ? (passage[(offset + i) % passage.length] ?? '') : (vocabulary[index] ?? '');
    if (passage && !config.punctuation) word = word.toLowerCase().replace(/[^a-z]/g, '');
    previous = word;
    if (config.numbers && random() < .1) word = String(Math.floor(random() * 10000));
    else if (!passage && config.punctuation && random() < .2) word = punctuate(word, random);
    result.push(word);
  }
  if (config.numbers && !result.some(w => /^\d+$/.test(w))) result[0] = String(Math.floor(random() * 10000));
  if (config.punctuation && !result.some(w => /[A-Z,.\"]/.test(w))) {
    const index = result.findIndex(w => !/^\d+$/.test(w));
    result[index < 0 ? result.length - 1 : index] = punctuate(index < 0 ? 'word' : (result[index] ?? 'word'), random);
  }
  return result;
}
