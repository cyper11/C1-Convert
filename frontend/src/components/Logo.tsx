import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  iconOnly?: boolean;
}

export function C1Icon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src="/logo-icon.png"
      alt="C1 Logo"
      width={size}
      height={size}
      className={`c1-logo-icon ${className}`}
      style={{
        width: size,
        height: size,
        display: 'inline-block',
        verticalAlign: 'middle',
        objectFit: 'contain',
        flexShrink: 0,
      }}
      loading="eager"
    />
  );
}

export function Logo({
  variant = 'full',
  size = 'md',
  className = '',
  iconOnly = false,
}: LogoProps) {
  const heightMap = {
    sm: 28,
    md: 38,
    lg: 46,
    xl: 56,
  };

  const height = heightMap[size] || 38;
  const isIconOnly = iconOnly || variant === 'icon';

  if (isIconOnly) {
    return <C1Icon size={height} className={className} />;
  }

  return (
    <div
      className={`c1-brand-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        userSelect: 'none',
      }}
    >
      <img
        src="/logo-light.png"
        alt="C1 Convert"
        className="brand-logo-img logo-light"
        style={{
          height: `${height}px`,
          width: 'auto',
        }}
        loading="eager"
      />
      <img
        src="/logo-dark.png"
        alt="C1 Convert"
        className="brand-logo-img logo-dark"
        style={{
          height: `${height}px`,
          width: 'auto',
        }}
        loading="eager"
      />
    </div>
  );
}
