import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CATEGORIES, DEFAULTS, DURATIONS, LEVELS, Session, WORD_COUNTS } from '@typechamp/typing-engine';
import type { Preferences, Result } from '@typechamp/typing-engine';
import { historyEntry, readHistory, saveHistory, parseCustomText, HISTORY_NOTICE } from './history';
import type { HistoryEntry } from './history';
import { savePreferences, STORAGE_NOTICE } from './preferences';

function fresh(config: Preferences, previous?: Session): Session {
  const seed = crypto.getRandomValues(new Uint32Array(1))[0] ?? 0;
  const variant = previous && previous.config.category === config.category && previous.config.level === config.level
    ? (previous.passageIndex + 1 + seed % 2) % 3 : seed % 3;
  return new Session(config, seed, undefined, variant);
}
function Icon({ name }: { name: 'keyboard' | 'restart' | 'sun' | 'moon' | 'arrow' | 'clock' }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'keyboard' && <><rect x="2" y="5" width="20" height="14" rx="3" /><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 15h10" /></>}
    {name === 'restart' && <><path d="M3 10a9 9 0 1 1 1 7M3 4v6h6" /></>}
    {name === 'sun' && <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>}
    {name === 'moon' && <path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z" />}
    {name === 'arrow' && <path d="M4 12h16m-6-6 6 6-6 6" />}
    {name === 'clock' && <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>}
  </svg>;
}

export function App({ initial = { preferences: DEFAULTS, notice: '' } }: { initial?: { preferences: Preferences; notice: string } }) {
  const [preferences, setPreferences] = useState(initial.preferences);
  const [notice, setNotice] = useState(initial.notice);
  const [session, setSession] = useState(() => fresh(initial.preferences));
  const [storedHistory] = useState(() => readHistory(() => localStorage));
  const [history, setHistory] = useState(storedHistory.entries);
  const historyRef = useRef(history);
  const [historyNotice, setHistoryNotice] = useState(storedHistory.notice);
  const [source, setSource] = useState('category');
  const [practiceTokens, setPracticeTokens] = useState<string[] | null>(null);
  const [customText, setCustomText] = useState('');
  const [customError, setCustomError] = useState('');
  const [, render] = useState(0);
  const [focused, setFocused] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const input = useRef<HTMLTextAreaElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const caret = useRef<HTMLElement>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const sessionRef = useRef(session);
  const previousStatus = useRef(session.status);
  const refresh = useCallback(() => render(n => n + 1), []);
  const status = session.status;
  const now = performance.now();
  const result = session.result(now);

  const focusInput = useCallback(() => input.current?.focus({ preventScroll: true }), []);
  const restart = useCallback(() => {
    const next = practiceTokens ? new Session({ ...preferences, mode: 'words' }, 0, practiceTokens) : fresh(preferences, sessionRef.current);
    sessionRef.current = next; previousStatus.current = 'ready';
    setSession(next); setAnnouncement('New test ready. Type to begin.');
    requestAnimationFrame(focusInput);
  }, [preferences, practiceTokens, focusInput]);

  const startPractice = (tokens: string[], label: string) => {
    const next = new Session({ ...preferences, mode: 'words' }, 0, tokens);
    setPracticeTokens(tokens); setSource(label);
    sessionRef.current = next; previousStatus.current = 'ready'; setSession(next);
    setAnnouncement(`${label} ready. ${tokens.length} words. Type to begin.`);
    requestAnimationFrame(focusInput);
  };
  const useCategories = () => {
    setPracticeTokens(null); setSource('category');
    const next = fresh(preferences, sessionRef.current);
    sessionRef.current = next; previousStatus.current = 'ready'; setSession(next);
    requestAnimationFrame(focusInput);
  };

  const update = (patch: Partial<Preferences>) => {
    const next = { ...preferences, ...patch };
    setPreferences(next);
    document.documentElement.dataset.theme = next.theme;
    if (!savePreferences(next, () => localStorage)) setNotice(STORAGE_NOTICE);
    if (!('theme' in patch || 'fontSize' in patch || 'boxHeight' in patch)) {
      setPracticeTokens(null); setSource('category');
      const nextSession = fresh(next, sessionRef.current); sessionRef.current = nextSession;
      previousStatus.current = 'ready'; setSession(nextSession);
    }
  };

  useEffect(() => { focusInput(); }, [focusInput]);
  useEffect(() => {
    if (status !== 'running') return;
    const updateClock = () => { session.tick(performance.now()); refresh(); };
    const timer = window.setInterval(updateClock, 50);
    document.addEventListener('visibilitychange', updateClock);
    return () => { clearInterval(timer); document.removeEventListener('visibilitychange', updateClock); };
  }, [session, status, refresh]);
  useEffect(() => {
    if (previousStatus.current === status) return;
    previousStatus.current = status;
    if (status === 'running') setAnnouncement('Test started.');
    if (status === 'finished') {
      const r = session.result(performance.now());
      const entries = [...historyRef.current, historyEntry(r, source, session.tokens.length)].slice(-100);
      historyRef.current = entries; setHistory(entries);
      if (!saveHistory(entries, () => localStorage)) setHistoryNotice(HISTORY_NOTICE);
      setAnnouncement(`Test complete. ${Math.round(r.wpm)} words per minute. ${r.accuracy.toFixed(1)} percent accuracy.`);
      resultHeading.current?.focus({ preventScroll: true });
    }
  }, [session, status, source]);

  useEffect(() => {
    const el = input.current;
    if (!el) return;
    let composing = false;
    const accept = (data: string | null) => {
      const s = sessionRef.current;
      if (data === ' ') s.submit(performance.now());
      else if (data) s.insert(data, performance.now());
      el.value = ''; refresh();
    };
    const beforeInput = (event: InputEvent) => {
      if (event.cancelable) event.preventDefault();
      if (composing || event.isComposing) return;
      if (event.inputType === 'insertText') accept(event.data);
      // All replacement, paste, drop, history and composition input is rejected here.
    };
    const fallbackInput = (event: Event) => {
      const e = event as InputEvent;
      if (!composing && !e.isComposing && e.inputType === 'insertText') accept(e.data);
      el.value = '';
    };
    const compositionStart = () => { composing = true; };
    const compositionEnd = (event: CompositionEvent) => { composing = false; if (/^[\x21-\x7e]$/.test(event.data)) accept(event.data); el.value = ''; };
    el.addEventListener('beforeinput', beforeInput);
    el.addEventListener('input', fallbackInput);
    el.addEventListener('compositionstart', compositionStart);
    el.addEventListener('compositionend', compositionEnd);
    return () => {
      el.removeEventListener('beforeinput', beforeInput); el.removeEventListener('input', fallbackInput);
      el.removeEventListener('compositionstart', compositionStart); el.removeEventListener('compositionend', compositionEnd);
    };
  }, [status === 'finished', refresh]);

  useLayoutEffect(() => {
    const box = viewport.current;
    if (!box || status === 'finished') return;
    const reposition = () => {
      const active = box.querySelector<HTMLElement>('[data-active="true"]');
      if (!active) return;
      const lineHeight = parseFloat(getComputedStyle(box).lineHeight);
      box.scrollTop = Math.max(0, active.offsetTop - box.offsetTop - lineHeight);
      const top = box.getBoundingClientRect().top;
      let boundary = session.lockedThroughIndex;
      for (const node of box.querySelectorAll<HTMLElement>('[data-token]')) {
        if (node.getBoundingClientRect().bottom <= top + 1) boundary = Math.max(boundary, Number(node.dataset.token));
      }
      if (boundary > session.lockedThroughIndex) { session.lockThrough(boundary); refresh(); }
      const anchor = active.querySelector<HTMLElement>('[data-caret-anchor]');
      if (anchor && caret.current) {
        const target = anchor.getBoundingClientRect();
        const bounds = box.getBoundingClientRect();
        caret.current.style.transform = `translate3d(${target.left - bounds.left}px, ${target.top - bounds.top + box.scrollTop}px, 0)`;
        caret.current.style.height = `${target.height}px`;
      }
    };
    reposition();
    const observer = new ResizeObserver(reposition); observer.observe(box);
    let cancelled = false;
    document.fonts.ready.then(() => { if (!cancelled) reposition(); });
    return () => { cancelled = true; observer.disconnect(); };
  }, [session, session.activeIndex, session.text, session.lockedThroughIndex, status, refresh, preferences.fontSize, preferences.boxHeight]);

  const presets = preferences.mode === 'time' ? DURATIONS : WORD_COUNTS;
  const selected = preferences.mode === 'time' ? preferences.timeSeconds : preferences.wordCount;
  const progress = status === 'finished' && session.config.mode === 'words' ? session.tokens.length : session.activeIndex;
  const remaining = session.deadline === null ? preferences.timeSeconds : Math.max(0, Math.ceil((session.deadline - now) / 1000));

  return <div className="app" onKeyDown={event => {
    if (event.key === 'Escape' && !event.defaultPrevented) { event.preventDefault(); restart(); }
  }}>
    <header className="header">
      <a className="brand" href={import.meta.env.BASE_URL} aria-label="TypeChamp home"><span className="brand-mark"><Icon name="keyboard" /></span><span>type<span className="brand-accent">champ</span><small>make every keystroke count.</small></span></a>
      <span className="header-note"><span className="status-dot" /> your space to find flow</span>
      <button className="theme-button" aria-label={`Switch to ${preferences.theme === 'dark' ? 'Light' : 'Dark'} Green theme`} onClick={() => update({ theme: preferences.theme === 'dark' ? 'light' : 'dark' })}><Icon name={preferences.theme === 'dark' ? 'sun' : 'moon'} /><span>{preferences.theme === 'dark' ? 'Dark' : 'Light'} Green</span></button>
    </header>

    <main>
      <div className="intro"><div className="eyebrow"><span className="tiny-line" /> A LITTLE FOCUS. A LITTLE FLOW.</div><h1>Find your rhythm<span>.</span></h1><p>Clear your mind. Let your fingers do the talking.</p></div>
      <section className="test-card" aria-label="Typing test">
        <aside className="configuration" aria-label="Practice settings">
          <div className="settings-heading">Your practice<span>Make it your own.</span></div>
          <fieldset disabled={status === 'running' || source !== 'category'} className="level-controls"><legend>English level</legend>
            {LEVELS.map(level => <button key={level} aria-pressed={preferences.level === level} onClick={() => update({ level })}>{level.charAt(0).toUpperCase() + level.slice(1)}</button>)}
          </fieldset>
          <label className="category-control">Content category
            <select value={preferences.category} disabled={status === 'running' || source !== 'category'} onChange={event => update({ category: event.target.value as Preferences['category'] })}>
              {Object.entries(CATEGORIES).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <fieldset disabled={status === 'running' || source !== 'category'} className="mode-controls"><legend>Test mode</legend>
            <button aria-pressed={preferences.mode === 'time'} onClick={() => update({ mode: 'time' })}><Icon name="clock" />time</button>
            <button aria-pressed={preferences.mode === 'words'} onClick={() => update({ mode: 'words' })}><span className="text-icon" aria-hidden="true">Aa</span>words</button>
          </fieldset>
          <span className="control-divider" />
          <fieldset disabled={status === 'running' || source !== 'category'} className="preset-controls"><legend>{preferences.mode === 'time' ? 'Test duration' : 'Word count'}</legend>
            {presets.map(value => <button key={value} aria-label={`${value} ${preferences.mode === 'time' ? 'seconds' : 'words'}`} aria-pressed={selected === value} onClick={() => update(preferences.mode === 'time' ? { timeSeconds: value as Preferences['timeSeconds'] } : { wordCount: value as Preferences['wordCount'] })}>{value}</button>)}
          </fieldset>
          <span className="control-divider" />
          <fieldset disabled={status === 'running' || source !== 'category'} className="modifier-controls"><legend>Include</legend>
            <button aria-pressed={preferences.punctuation} onClick={() => update({ punctuation: !preferences.punctuation })}><span className="text-icon">@</span>punctuation</button>
            <button aria-pressed={preferences.numbers} onClick={() => update({ numbers: !preferences.numbers })}><span className="text-icon">#</span>numbers</button>
          </fieldset>
          <label className="reading-control" htmlFor="font-size">Font size <output>{preferences.fontSize}px</output>
            <input id="font-size" type="range" min="18" max="40" step="1" value={preferences.fontSize} onChange={e => update({ fontSize: Number(e.target.value) })} />
          </label>
          <label className="reading-control" htmlFor="box-height">Typing-box height <output>{preferences.boxHeight}px</output>
            <input id="box-height" type="range" min="160" max="480" step="8" value={preferences.boxHeight} onChange={e => update({ boxHeight: Number(e.target.value) })} />
          </label>
          {source !== 'category' && <button className="secondary-button" onClick={useCategories}>Back to categories</button>}
          <p className="settings-note">{status === 'running' ? 'Restart to change your settings.' : 'Choose your content, then click the text to begin.'}</p>
        </aside>

        {status === 'finished' ? <Results result={result} headingRef={resultHeading} next={restart} source={source} wordCount={session.tokens.length} mistakes={[...session.mistakes]} practice={tokens => startPractice(tokens, 'Mistake practice')} /> : <div className="test-body">
          <div className="test-meta"><span className="language"><span aria-hidden="true">◎</span> english · {preferences.level} <span className="meta-slash">/</span> {source === 'category' ? CATEGORIES[preferences.category] : source}</span><span className="ready-label"><span className="status-dot" />{status === 'running' ? 'in the flow' : 'ready when you are'}</span></div>
          <div className="live-stats" aria-label="Live statistics"><div><strong data-testid="progress">{session.config.mode === 'time' ? remaining : `${progress}/${session.tokens.length}`}</strong><span>{session.config.mode === 'time' ? 'seconds' : 'words'}</span></div><div><strong data-testid="live-wpm">{Math.round(result.wpm)}</strong><span>wpm</span></div><span className="start-instruction">{status === 'ready' ? 'start typing to begin' : 'one word at a time'}</span></div>
          <div className={`typing-surface ${focused ? 'is-focused' : ''} ${status === 'running' ? 'is-running' : ''}`} onClick={focusInput}>
            <div className="word-viewport" style={{ fontSize: preferences.fontSize, height: preferences.boxHeight, lineHeight: `${preferences.fontSize * 1.9}px` }} ref={viewport} aria-hidden="true" data-testid="words">
              <i className="caret" ref={caret} />
              {session.tokens.slice(session.lockedThroughIndex + 1, session.lockedThroughIndex + 121).map((word, offset) => {
                const index = session.lockedThroughIndex + 1 + offset;
                const typed = session.typed.get(index) ?? '';
                const active = index === session.activeIndex;
                const submitted = session.submitted.has(index);
                return <span className="word" key={index} data-token={index} data-target={word} data-active={active}>
                  {Array.from({ length: Math.max(word.length, typed.length) }, (_, i) => <span key={i} className={i >= word.length ? 'char extra' : i < typed.length ? typed[i] === word[i] ? 'char correct' : 'char incorrect' : submitted ? 'char missed' : 'char'}>{active && i === typed.length && <i data-caret-anchor="true" />}{i >= word.length ? typed[i] : word[i]}</span>)}
                  {active && typed.length >= word.length && <i data-caret-anchor="true" />}
                </span>;
              })}
            </div>
            <label className="sr-only" htmlFor="typing-input">Typing input</label>
            <textarea id="typing-input" ref={input} className="input-capture" rows={1} aria-describedby="typing-instructions" autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck={false}
              onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onPaste={e => e.preventDefault()} onDrop={e => e.preventDefault()} onDragOver={e => e.preventDefault()}
              onKeyDown={event => {
                if (event.nativeEvent.isComposing || event.ctrlKey || event.metaKey || event.altKey) return;
                if (event.key === 'Backspace') { event.preventDefault(); session.backspace(performance.now()); refresh(); }
                else if (event.key === ' ') { event.preventDefault(); session.submit(performance.now()); refresh(); }
                else if (['Enter', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) event.preventDefault();
              }} />
            {!focused && <button className="focus-prompt" onClick={focusInput}><Icon name="keyboard" /> click to continue <span>or press Tab to focus</span></button>}
          </div>
          <div className="test-bottom"><span><span className="status-dot" />{status === 'running' ? 'stay with it. you’re doing great.' : 'no rush. just you and the keys.'}</span><button className="restart-button" onClick={restart} aria-label="Restart test"><Icon name="restart" /><span>restart</span><kbd>esc</kbd></button></div>
        </div>}
      </section>
      <p id="typing-instructions" className="keyboard-hints"><span><kbd>esc</kbd> restart test</span><span><kbd>tab</kbd> navigate</span><span><kbd>space</kbd> next word</span></p>
      <section className="practice-extras" aria-label="Practice tools">
        <details className="custom-panel">
          <summary>Practice your own text</summary>
          <p>Paste up to 10,000 characters. Practice the whole passage, including its punctuation and numbers. Line breaks become spaces.</p>
          <label htmlFor="custom-text">Your passage</label>
          <textarea id="custom-text" value={customText} onChange={e => { setCustomText(e.target.value); setCustomError(''); }} rows={5} placeholder="Paste an English passage here…" aria-describedby={customError ? 'custom-error' : undefined} />
          {customError && <p id="custom-error" role="alert">{customError}</p>}
          <button className="next-button" disabled={status === 'running'} onClick={() => {
            try { const tokens = parseCustomText(customText); setCustomError(''); startPractice(tokens, 'Custom text'); }
            catch (error) { setCustomError((error as Error).message); }
          }}>Practice this text <Icon name="arrow" /></button>
          {status === 'running' && <p>Restart the current test before switching to custom text.</p>}
        </details>
        <ProgressHistory entries={history} notice={historyNotice} />
      </section>
      <div className="quiet-note"><span className="leaf" aria-hidden="true">❧</span><p>Small practice. Steady progress.<span>A few minutes today, a little faster tomorrow.</span></p></div>
      {notice && <p className="storage-notice" role="status">{notice}</p>}
      <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
    </main>

    <footer><span><span className="footer-brand">typechamp</span> <span className="footer-separator">/</span> built for the love of typing</span><span>no account. no distractions. <span className="footer-accent">just type.</span></span><span className="version">v1.0 <span className="status-dot" /></span></footer>
  </div>;
}

function Results({ result, headingRef, next, source, wordCount, mistakes, practice }: { result: Result; headingRef: React.RefObject<HTMLHeadingElement | null>; next: () => void; source: string; wordCount: number; mistakes: string[]; practice: (tokens: string[]) => void }) {
  const { config } = result;
  return <div className="results">
    <div className="eyebrow">A MOMENT OF PROGRESS</div><h2 tabIndex={-1} ref={headingRef}>Nicely done.</h2><p className="result-subtitle">Every keystroke is a step forward.</p>
    <div className="headline-results"><div><span>words per minute</span><strong data-testid="result-wpm">{Math.round(result.wpm)}</strong></div><div><span>accuracy</span><strong data-testid="result-accuracy">{result.accuracy.toFixed(1)}<small>%</small></strong></div></div>
    <dl className="breakdown">{(['correct', 'incorrect', 'extra', 'missed'] as const).map(key => <div key={key}><dt>{key} characters</dt><dd data-testid={`result-${key}`}>{result[key]}</dd></div>)}</dl>
    <p className="result-details">{config.mode === 'time' ? `Time · ${config.timeSeconds} seconds` : `Words · ${wordCount} words`}<span>{source === 'category' ? `English · ${config.level} · ${CATEGORIES[config.category]}` : source}</span><span>{(result.elapsedMs / 1000).toFixed(1)}s elapsed</span><span>{source === 'category' ? [config.punctuation && 'punctuation', config.numbers && 'numbers'].filter(Boolean).join(' + ') || 'no modifiers' : 'original text'}</span></p>
    <details className="scoring-help"><summary>How is my score calculated?</summary><p>WPM counts correct characters and submitted separators in groups of five per minute. Accuracy measures successful input attempts and retains mistakes even after you correct them. Missed characters are untyped endings of submitted words; extra characters go beyond a target word.</p></details>
    <button className="next-button" onClick={next}>{source === 'category' ? 'Next test' : 'Try again'} <Icon name="arrow" /></button><div className="mistake-practice">
      {mistakes.length ? <><p>{mistakes.length} words to revisit, including corrected mistakes.</p><p className="mistake-words">{mistakes.join(' · ')}</p><button className="secondary-button" onClick={() => practice(mistakes)}>Practice these words</button></> : <p>No mistake words in this test.</p>}
    </div><p className="saving-note">Your last 100 results stay in this browser when local storage is available.</p>
  </div>;
}

function ProgressHistory({ entries, notice }: { entries: HistoryEntry[]; notice: string }) {
  const latest = entries.at(-1);
  const previous = latest?.comparison ? entries.slice(0, -1).reverse().find(entry => entry.comparison === latest.comparison) : undefined;
  const change = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(1)}`;
  return <section className="history-panel" aria-labelledby="history-heading">
    <h2 id="history-heading">Your progress</h2>
    <p>Last {entries.length} of up to 100 completed tests · stored on this device</p>
    {notice && <p role="status" className="storage-notice">{notice}</p>}
    {!latest ? <p>Finish a test to start your history.</p> : <>
      <div className="history-summary"><span>Latest <strong>{latest.wpm.toFixed(1)} WPM</strong></span><span>Accuracy <strong>{latest.accuracy.toFixed(1)}%</strong></span><span>Best <strong>{Math.max(...entries.map(e => e.wpm)).toFixed(1)} WPM</strong></span></div>
      <p>{previous ? `${change(latest.wpm - previous.wpm)} WPM and ${change(latest.accuracy - previous.accuracy)} accuracy percentage points vs. your previous test with the same settings.` : 'Complete another category test with the same settings to compare improvement.'}</p>
      <div className="history-table"><table><caption className="sr-only">Recent typing results, newest first</caption><thead><tr><th>Date</th><th>Practice</th><th>WPM</th><th>Accuracy</th></tr></thead><tbody>
        {entries.slice().reverse().map(entry => <tr key={entry.id}><td><time dateTime={entry.date}>{new Date(entry.date).toLocaleString()}</time></td><td>{entry.label}</td><td>{entry.wpm.toFixed(1)}</td><td>{entry.accuracy.toFixed(1)}%</td></tr>)}
      </tbody></table></div>
    </>}
  </section>;
}
