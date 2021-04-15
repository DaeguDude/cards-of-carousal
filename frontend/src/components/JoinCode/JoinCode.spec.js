import React from 'react';
import { render, screen } from '@testing-library/react';
import DisplayJoinCode from './JoinCode';

// Can render

describe('joinCode', () => {
  // ----------------------------------------------------------------------------
  // Rendering Tests
  describe('rendering', () => {
    it('renders when "code" is an empty string', () => {
      render(<DisplayJoinCode loading={[]} code="" />);
      expect(screen.getByTestId('join-code')).toBeInTheDocument();
    });

    it('renders properly', () => {
      render(<DisplayJoinCode loading={[]} code="XYA3Z" />);
      expect(screen.getByText('XYA3Z')).toBeInTheDocument();
    });
  });
});
