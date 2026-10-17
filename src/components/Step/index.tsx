import React, {type ReactNode} from 'react';

type StepProps = {
  number: string | number;
  title: string;
  children?: ReactNode;
  src?: string;
  alt?: string;
  flip?: boolean;
};

// Numbered walkthrough step with an optional screenshot beside the text.
// Used by docs/demo.mdx and docs/getting-started/quickstart.mdx. Kept as a
// module (not an inline MDX export) so the llms markdown twins stay clean.
const Step = ({number, title, children, src, alt, flip}: StepProps): ReactNode => (
  <div style={{
    display: 'flex',
    flexDirection: src ? (flip ? 'row-reverse' : 'row') : 'column',
    gap: '2rem',
    alignItems: src ? 'center' : 'flex-start',
    marginBottom: '3rem',
    paddingBottom: '3rem',
    borderBottom: '1px solid var(--ifm-color-emphasis-200)',
  }}>
    <div style={{flex: '1', minWidth: 0}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem'}}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '2rem',
          height: '2rem',
          borderRadius: '50%',
          background: 'var(--ifm-color-primary)',
          color: 'white',
          fontSize: '0.85rem',
          fontWeight: 700,
          flexShrink: 0,
        }}>{number}</span>
        <h3 style={{margin: 0, fontSize: '1.25rem'}}>{title}</h3>
      </div>
      <div>{children}</div>
    </div>
    {src && (
      <div style={{flex: '1.2', minWidth: 0}}>
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            borderRadius: '12px',
            border: '1px solid var(--ifm-color-emphasis-200)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
          }}
        />
      </div>
    )}
  </div>
);

export default Step;
