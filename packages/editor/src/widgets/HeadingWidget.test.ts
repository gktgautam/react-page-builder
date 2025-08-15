import { describe, it, expect } from 'vitest';
import DOMPurify from 'dompurify';

describe('HeadingWidget sanitization', () => {
  it('sanitizes malicious html', () => {
    const dirty = '<img src=x onerror=alert(1)><script>alert("xss")</script>';
    const clean = DOMPurify.sanitize(dirty);
    expect(clean).toBe('<img src="x">');
  });
});
