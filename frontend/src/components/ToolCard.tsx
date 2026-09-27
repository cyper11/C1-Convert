import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ToolConfig } from '../types';

export function ToolCard({ tool }: { tool: ToolConfig }) {
  const Icon = tool.icon;

  return (
    <Link to={tool.route} className="tool-card" aria-label={`Open ${tool.name} tool`}>
      <div className="tool-card-top">
        <div className={`tool-icon ${tool.accent}`}>
          <Icon size={32} />
        </div>
        <div className="format-badge">
          <span>{tool.inputFormat}</span>
          <ArrowRight size={12} className="format-arrow" />
          <span className="format-out">{tool.outputFormat}</span>
        </div>
      </div>

      <div className="tool-card-body">
        <h3 className="tool-card-title">{tool.name}</h3>
        <p className="tool-card-desc">{tool.description}</p>
      </div>

      <div className="tool-card-footer">
        <span className="tool-action-label">Use tool</span>
        <ArrowRight className="tool-arrow" size={17} />
      </div>
    </Link>
  );
}

export function ToolGrid({ items }: { items: ToolConfig[] }) {
  return (
    <div className="tool-grid">
      {items.map((t) => (
        <ToolCard key={t.id} tool={t} />
      ))}
    </div>
  );
}
