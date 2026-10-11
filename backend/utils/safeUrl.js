// Accepts an empty string, a relative path (e.g. "assets/documents/x.pdf") or
// an http(s) URL. Rejects other schemes such as `javascript:` so a stored link
// can never run script when a visitor clicks it.
function isSafeUrl(value) {
  if (value === '' || value === null || value === undefined) return true;
  const url = String(value).trim();
  if (/^https?:\/\//i.test(url)) return true;
  return !/^[a-z][a-z0-9+.-]*:/i.test(url) && !url.startsWith('//');
}

const safeUrlValidator = {
  validator: isSafeUrl,
  message: (props) => `${props.path} must be a relative path or an http(s) URL`,
};

module.exports = { isSafeUrl, safeUrlValidator };
