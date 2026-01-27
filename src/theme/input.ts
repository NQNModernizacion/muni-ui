export const inputBase =
  'block w-full rounded-xl px-3 py-2 outline-none transition';

export const inputColors =
  'bg-surface text-text placeholder:text-muted border border-border';

export const inputFocus =
  'focus:border-primary-400 focus:ring-2 focus:ring-primary-400/25';

export const inputDisabled =
  'disabled:opacity-60 disabled:cursor-not-allowed';

export const inputReadOnly =
  'read-only:bg-bg read-only:text-muted';

export const inputClass = [
  inputBase,
  inputColors,
  inputFocus,
  inputDisabled,
  inputReadOnly,
].join(' ');
