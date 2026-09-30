const VOICE_KEY = "english-practice-voice";
let sessionVoice = "";

export function getSavedVoice(): string {
  try {
    return window.localStorage.getItem(VOICE_KEY) ?? sessionVoice;
  } catch {
    return sessionVoice;
  }
}

export function saveVoice(voiceURI: string): boolean {
  sessionVoice = voiceURI;
  try {
    window.localStorage.setItem(VOICE_KEY, voiceURI);
    return true;
  } catch {
    return false;
  }
}

export function applySpeechVoice(utterance: SpeechSynthesisUtterance) {
  const voices = window.speechSynthesis.getVoices().filter((voice) => /^en(?:[-_]|$)/i.test(voice.lang));
  const selected = voices.find((voice) => voice.voiceURI === getSavedVoice());
  const voice = selected ?? voices.find((voice) => voice.default) ?? voices[0];
  utterance.voice = voice ?? null;
  utterance.lang = voice?.lang ?? "en-US";
}
