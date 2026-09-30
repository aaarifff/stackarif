import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { readPreferences } from './preferences';
import './styles.css';

const initial = readPreferences(() => localStorage);
document.documentElement.dataset.theme = initial.preferences.theme;
createRoot(document.getElementById('root')!).render(<StrictMode><App initial={initial} /></StrictMode>);
