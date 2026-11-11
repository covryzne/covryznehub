'use client';

import { GitPullRequest } from 'lucide-react';

import AboutCounter from './about-counter';
const metrics = [
  {
    label: 'Code Review Projects',
    to: 1000,
    suffix: '+',
    decimals: 0,
    final: '1000+',
    primary: true,
  },
  {
    label: 'Avg. Rating',
    to: 4.9,
    suffix: '/5.0',
    decimals: 1,
    final: '4.9/5.0',
    primary: false,
  },
  {
    label: 'Years Exp',
    to: 1,
    suffix: '+',
    decimals: 0,
    final: '1+',
    primary: false,
  },
];

export default function ReviewerStats() {
  return (
    <>
      <p className="eyebrow reviewer-eyebrow">
        <GitPullRequest size={14} aria-hidden="true" />
        EXTERNAL CODE REVIEWER
      </p>
      <p className="reviewer-company">Dicoding Indonesia</p>
      <dl className="reviewer-metrics">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={
              metric.primary
                ? 'reviewer-metric reviewer-primary'
                : 'reviewer-metric'
            }
          >
            <dt>{metric.label}</dt>
            <dd>
              <AboutCounter value={metric.to} suffix={metric.suffix} decimals={metric.decimals} />
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
