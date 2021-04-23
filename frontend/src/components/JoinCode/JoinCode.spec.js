import React from 'react';
import { render, screen } from '@testing-library/react';
import DisplayJoinCode from './JoinCode';

// Can render

describe('joinCode', () => {
  // ----------------------------------------------------------------------------
  // Rendering Tests
  describe('rendering', () => {
    it('renders loading indicator when "code" is an empty string', () => {
      render(<DisplayJoinCode code="" />);
      expect(screen.getByTestId('loader')).toBeInTheDocument();
      expect(screen.getByTestId('join-code')).toBeInTheDocument();
    });

    it('renders properly', () => {
      render(<DisplayJoinCode code="XYA3Z" />);
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.getByText('XYA3Z')).toBeInTheDocument();
    });

    it('displays a loading indicator when loading is true', () => {
      render(<DisplayJoinCode loading code="XYA3Z" />);
      expect(screen.getByTestId('loader')).toBeInTheDocument();
      expect(screen.queryByText('XYA3Z')).not.toBeInTheDocument();
    });
  });
});
