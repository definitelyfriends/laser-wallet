import React from 'react';
import Markdown from 'markdown-to-jsx';
import Log from '../../../CHANGELOG.md';

const Changelog = () => {
  return <Markdown>{Log}</Markdown>;
};

export default Changelog;
