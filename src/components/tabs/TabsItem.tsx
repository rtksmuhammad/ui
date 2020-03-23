import * as React from 'react';

import styled, { css } from 'styled-components';

import { Typography } from '../typography/Typography';

import { TabsContext } from './TabsContext';

import { useTheme } from '../../hooks/useTheme';

export interface TabsItemProps {
  /** className of the tabs item component */
  className?: string;

  /** unique identifier for the tab items */
  itemKey: string | number;

  /** title of the tab item */
  title: React.ReactNode;
}

const Container = styled.div``;

const Title = styled(Typography.Body)<{ theme: any; isSelected: boolean }>`
  ${({ theme, isSelected }) => css`
    user-select: none;
    padding: 8px 16px;
    box-sizing: border-box;
    cursor: pointer;
    transition: color ${theme.animationTimeVeryFast}s ease-in-out;

    ${isSelected &&
      css`
        color: ${theme.colors.primary};
      `}

    &:hover {
      color: ${theme.colors.primary};
    }
  `}
`;

export const TabsItem: React.FunctionComponent<TabsItemProps> = ({
  className,
  itemKey,
  title,
}) => {
  const tabItemRef = React.useRef<HTMLDivElement>(null);

  const theme = useTheme();

  const {
    onClick,
    defaultSelectedItem,
    setActiveItem,
    selectedItem,
  } = React.useContext(TabsContext);

  const handleClick = React.useCallback(
    e => {
      if (onClick) {
        onClick(itemKey, e);
      }
    },
    [onClick, itemKey]
  );

  const setSelectedItem = React.useCallback(() => {
    if (tabItemRef.current == null) {
      return;
    }

    setActiveItem({
      itemKey,
      width: tabItemRef.current.offsetWidth,
      x: tabItemRef.current.offsetLeft,
    });
  }, [setActiveItem, tabItemRef, itemKey]);

  // handles setting the default selected item
  React.useEffect(() => {
    if (defaultSelectedItem === itemKey && tabItemRef.current !== null) {
      setSelectedItem();
    }
  }, []);

  // handles when the selected item changes
  React.useEffect(() => {
    if (selectedItem === itemKey && tabItemRef.current !== null) {
      setSelectedItem();
    }
  }, [selectedItem]);

  return (
    <Container
      ref={tabItemRef}
      className={`${className} rtk-tabs-item`}
      onClick={handleClick}
    >
      <Title theme={theme} isSelected={itemKey === selectedItem}>
        {title}
      </Title>
    </Container>
  );
};