import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUndo } from '@fortawesome/free-solid-svg-icons/faUndo';

import { IconProps } from './types';

const Undo: React.FunctionComponent<IconProps> = props => {
  return <FontAwesomeIcon icon={faUndo} {...props} />;
};

export default Undo;
