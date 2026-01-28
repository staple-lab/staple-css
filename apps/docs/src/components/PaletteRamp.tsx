import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import './PaletteRamp.css';

interface PaletteRampProps {
  name: string;
  palette: Array<{ step: number; color: string }>;
}

export function PaletteRamp({ name, palette }: PaletteRampProps) {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const handleCopy = async (step: number, varName: string) => {
    await navigator.clipboard.writeText(`var(--st-${name}-${step * 100})`);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="palette-ramp-container">
      <div className="palette-ramp-header">
        <h3 className="palette-name">{name}</h3>
      </div>
      <div className="palette-ramp-grid">
        {palette.map(({ step, color }) => (
          <div
            key={step}
            className={`palette-ramp-step ${copiedStep === step ? 'copied' : ''}`}
            title={`${name}-${step * 100}`}
          >
            <div
              className="ramp-color"
              style={{ backgroundColor: color }}
              aria-label={`${name} ${step * 100}`}
            />
            <button
              className="ramp-copy-btn"
              onClick={() => handleCopy(step, `--st-${name}-${step * 100}`)}
              title={copiedStep === step ? 'Copied!' : 'Copy variable'}
              aria-label={`Copy ${name}-${step * 100}`}
            >
              {copiedStep === step ? <Check size={12} /> : <Copy size={12} />}
            </button>
            <span className="ramp-step-label">{step * 100}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
