import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import './TokenCopyButton.css';

interface TokenCopyButtonProps {
  varName: string;
  copyValue?: string;
}

export function TokenCopyButton({ varName, copyValue }: TokenCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = copyValue || varName;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`token-copy-btn ${copied ? 'copied' : ''}`}
      title={copied ? 'Copied!' : `Copy ${varName}`}
      aria-label={`Copy token ${varName}`}
    >
      {copied ? (
        <>
          <Check size={14} />
          <span className="copy-text">Copied</span>
        </>
      ) : (
        <>
          <Copy size={14} />
          <span className="copy-text">Copy</span>
        </>
      )}
    </button>
  );
}
