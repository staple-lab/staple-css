import { motionTokens } from "@staple-css/tokens";
import { TokenTable } from "../components/TokenTable";
import { CodeBlock } from "../components/CodeBlock";

const usageCode = `.button {
  transition:
    background var(--st-motion-duration-fast) var(--st-motion-easing-default),
    transform var(--st-motion-duration-fast) var(--st-motion-easing-default);
}

.accordion-content {
  transition: height var(--st-motion-duration-moderate) var(--st-motion-easing-out);
}

.page-enter {
  animation: fadeIn var(--st-motion-duration-slow) var(--st-motion-easing-out);
}`;

function isDuration(name: string) { return name.includes("-duration-"); }
function isEasing(name: string) { return name.includes("-easing-"); }

export function MotionTokensPage() {
  const durations = motionTokens.filter((t) => isDuration(t.name));
  const easings = motionTokens.filter((t) => isEasing(t.name));

  return (
    <div>
      <h1 style={{ marginBottom: 12 }}>Motion tokens</h1>
      <p style={{ color: "var(--doc-color-text-secondary)", marginBottom: 32 }}>
        {motionTokens.length} tokens covering duration and easing curves.
        Combine a duration with an easing curve for consistent animations.
      </p>

      <CodeBlock code={usageCode} language="css" />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Duration</h2>
      <TokenTable
        tokens={durations.map((t) => ({
          name: `--${t.name}`,
          value: t.value,
          preview: (
            <div
              style={{
                width: 40,
                height: 8,
                borderRadius: 4,
                backgroundColor: "var(--doc-color-accent)",
                opacity: 0.6,
                animation: t.value === "0ms"
                  ? undefined
                  : `motionSlideRight ${t.value} ease-in-out infinite alternate`,
              }}
            />
          ),
        }))}
      />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Easing</h2>
      <TokenTable
        tokens={easings.map((t) => ({
          name: `--${t.name}`,
          value: t.value,
        }))}
      />

      <style>{`
        @keyframes motionSlideRight {
          from { transform: translateX(0); }
          to { transform: translateX(60px); }
        }
      `}</style>
    </div>
  );
}
