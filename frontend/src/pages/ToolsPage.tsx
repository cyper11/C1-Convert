import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Page } from '../components/Page';
import { ToolGrid } from '../components/ToolCard';
import { tools, categories } from '../config/tools';

export function ToolsPage() {
  const [q, setQ] = useState('');
  const [c, setC] = useState('All');

  const list = useMemo(
    () =>
      tools.filter(
        (t) =>
          (c === 'All' || t.category === c) &&
          `${t.name} ${t.description}`.toLowerCase().includes(q.toLowerCase())
      ),
    [q, c]
  );

  return (
    <Page>
      <div className="page-container">
        <div className="page-intro">
          <div>
            <span className="eyebrow">TOOLBOX</span>
            <h1>
              Everything you need to
              <br />
              <em>work with documents.</em>
            </h1>
            <p>Focused tools for the file tasks that slow you down.</p>
          </div>
          <div className="intro-stat">
            <strong>{tools.length}</strong>
            <span>tools ready to use</span>
          </div>
        </div>
        <div className="tool-controls">
          <label className="search-box">
            <Search size={17} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search tools..."
            />
          </label>
          <div className="filter-row">
            {categories.map((x) => (
              <button
                key={x}
                className={`filter-chip ${c === x ? 'active' : ''}`}
                onClick={() => setC(x)}
              >
                {x}
              </button>
            ))}
          </div>
        </div>
        <p className="results-count">{list.length} tools</p>
        <ToolGrid items={list} />
      </div>
    </Page>
  );
}
