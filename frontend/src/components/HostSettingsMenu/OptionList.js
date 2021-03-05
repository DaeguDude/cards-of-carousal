import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  listContent: PropTypes.arrayOf(PropTypes.string).isRequired,
  isActive: PropTypes.bool.isRequired,
  isActiveCallback: PropTypes.func.isRequired,
  onListItemClick: PropTypes.func.isRequired,
  activeText: PropTypes.string.isRequired,
  inactiveText: PropTypes.string.isRequired,
};

const OptionListButton = styled.button`
  display: flex;
  flex-direction: column;

  color: ${({ isActive }) =>
    isActive ? 'var(--secondary-text-color)' : 'var(--primary-text-color)'};
  background-color: ${({ isActive }) =>
    isActive ? 'var(--secondary-background-color)' : 'transparent'};
  border: none;
  padding: 20px 25px;
  width: 100%;

  text-align: left;
  font-size: 1.5rem;
  font-weight: bold;
`;

const OptionListItemButton = styled(OptionListButton)`
  background-color: transparent;
  font-size: 1.3rem;
  padding: 10px 50px;
`;

function OptionList({
  listContent,
  isActive,
  isActiveCallback,
  onListItemClick,
  activeText,
  inactiveText,
}) {
  return (
    <div>
      <OptionListButton
        type="button"
        onClick={isActiveCallback}
        isActive={isActive}
      >
        {isActive ? activeText : inactiveText}
      </OptionListButton>
      {isActive &&
        listContent.map((listItem) => (
          <OptionListItemButton
            type="button"
            key={listItem}
            onClick={() => onListItemClick(listItem)}
          >
            {listItem}
          </OptionListItemButton>
        ))}
    </div>
  );
}

OptionList.propTypes = propTypes;

export default OptionList;
