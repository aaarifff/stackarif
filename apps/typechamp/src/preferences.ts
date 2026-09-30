import { DEFAULTS, validatePreferences } from '@typechamp/typing-engine';
import type { Preferences } from '@typechamp/typing-engine';
export const STORAGE_KEY = 'typechamp.preferences.v1';
export const STORAGE_NOTICE = 'Settings cannot be saved on this device. You can keep typing; changes will last for this visit.';
export interface StorageAccess { getItem(key: string): string | null; setItem(key: string, value: string): void }
export function readPreferences(getStorage: () => StorageAccess): { preferences: Preferences; notice: string } {
  let raw: string | null;
  try { raw = getStorage().getItem(STORAGE_KEY); } catch { return { preferences: { ...DEFAULTS }, notice: STORAGE_NOTICE }; }
  try { return { preferences: validatePreferences(raw ? JSON.parse(raw) : null), notice: '' }; }
  catch { return { preferences: { ...DEFAULTS }, notice: '' }; }
}
export function savePreferences(preferences: Preferences, getStorage: () => StorageAccess): boolean {
  try { getStorage().setItem(STORAGE_KEY, JSON.stringify(validatePreferences(preferences))); return true; }
  catch { return false; }
}
