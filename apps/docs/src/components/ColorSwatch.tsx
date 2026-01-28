import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import './ColorSwatch.css';

interface ColorSwatchProps {
  name: string;
  hex: string;
  tokenName?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ColorSwatch({ name, hex, tokenName, size = 'md' }: ColorSwatchProps) {
  const [copied, setCopied] = useState<'name' | 'hex' | null>(null);

  const handleCopy = async (text: string, type: 'name' | 'hex') => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const sizeClasses = {
    sm: 'color-swatch-sm',
    md: 'color-swatch-md',
    lg: 'color-swatch-lg',
  };

  return (
    <div className={`color-swatch ${sizeClasses[size]}`}>
      <div
        className="color-preview"
        style={{ backgroundColor: hex }}
        title={`Color: ${name}`}
        aria-label={`Color swatch: ${name} (${hex})`}
      />
      <div className="color-info">
        <div className="color-name">
          <span className="name-text">{name}</span>
          <button
            className={`copy-icon-btn ${copied === 'name' ? 'copied' : ''}`}
            onClick={() => handleCopy(tokenName || hex, 'name')}
            title={copied === 'name' ? 'Copied!' : `Copy ${tokenName ? 'token' : 'hex'}`}
            aria-label={`Copy ${name}`}
          >
            {copied === 'name' ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
        <code className="color-hex">{hex}</code>
        {tokenName && (
          <code className="color-token-name">{tokenName}</code>
        )}
      </div>
    </div>
  );
}
