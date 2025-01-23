import React from 'react';
import { JumbotronProps } from './Jumbotron.types';
import { JumbotronContainer, JumbotronContent, JumbotronTitle, JumbotronSubtitle } from './Jumbotron.styles';

const Jumbotron: React.FC<JumbotronProps> = ({ title, subtitle, backgroundImage }) => {
  return (
    <JumbotronContainer backgroundImage={backgroundImage}>
      <JumbotronContent>
        <JumbotronTitle variant="h2">{title}</JumbotronTitle>
        <JumbotronSubtitle variant="h5">{subtitle}</JumbotronSubtitle>
      </JumbotronContent>
    </JumbotronContainer>
  );
};

export default Jumbotron;
