import React from 'react';
import { InfoTooltip } from './InfoTooltip';

export function AuthenticityExplanation() {
  return (
    <InfoTooltip
      title="How is the Authenticity Score calculated?"
      content={
        <div className="space-y-2">
          <p>Our ML-powered authenticity score analyzes multiple factors:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Language patterns and writing style</li>
            <li>Review context and specificity</li>
            <li>Reviewer's history and expertise</li>
            <li>Photo verification</li>
            <li>Cross-reference with other verified reviews</li>
          </ul>
          <p className="mt-2 text-xs text-gray-500">
            Scores are updated in real-time as our AI system continuously learns and improves.
          </p>
        </div>
      }
    />
  );
}
