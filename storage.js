const STORAGE_KEY = 'sylvaRegistrations';

function normalizeEntries(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.filter(Boolean);
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch (error) {
    return [];
  }
}

function appendRegistration(existingEntries, entry) {
  const normalized = normalizeEntries(existingEntries);
  const nextEntries = [entry, ...normalized].slice(0, 100);
  return nextEntries;
}

function readRegistrations(storage = window.localStorage) {
  if (!storage) return [];
  try {
    return normalizeEntries(storage.getItem(STORAGE_KEY));
  } catch (error) {
    return [];
  }
}

function writeRegistrations(entries, storage = window.localStorage) {
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Unable to save registrations', error);
  }
}

function saveRegistration(entry, storage = window.localStorage) {
  const entries = readRegistrations(storage);
  const nextEntries = appendRegistration(entries, entry);
  writeRegistrations(nextEntries, storage);
  return nextEntries;
}

if (typeof module !== 'undefined') {
  module.exports = {
    STORAGE_KEY,
    normalizeEntries,
    appendRegistration,
    readRegistrations,
    writeRegistrations,
    saveRegistration
  };
}

if (typeof window !== 'undefined') {
  window.sylvaStorage = {
    STORAGE_KEY,
    normalizeEntries,
    appendRegistration,
    readRegistrations,
    writeRegistrations,
    saveRegistration
  };
}
