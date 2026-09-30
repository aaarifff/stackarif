export {};

declare global {
  interface SpeechRecognitionEventResultItem {
    transcript: string;
    confidence: number;
  }

  interface SpeechRecognitionResultLike {
    isFinal: boolean;
    0: SpeechRecognitionEventResultItem;
    length: number;
  }

  interface SpeechRecognitionEventLike extends Event {
    resultIndex: number;
    results: ArrayLike<SpeechRecognitionResultLike>;
  }

  interface SpeechRecognitionErrorEventLike extends Event {
    error: string;
  }

  interface SpeechRecognitionLike extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: ((this: SpeechRecognitionLike, ev: SpeechRecognitionEventLike) => void) | null;
    onerror: ((this: SpeechRecognitionLike, ev: SpeechRecognitionErrorEventLike) => void) | null;
    onend: ((this: SpeechRecognitionLike, ev: Event) => void) | null;
    onstart: ((this: SpeechRecognitionLike, ev: Event) => void) | null;
  }

  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  }
}
