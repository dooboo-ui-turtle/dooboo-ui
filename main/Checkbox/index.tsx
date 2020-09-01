import React, { FC, useState } from 'react';
import {
  TouchableHighlight,
} from 'react-native';

import styled from 'styled-components/native';

interface MarkerContainerProps {
  boxSize?: number
  boxColor?: string
}

interface LabelProps {
  labelColor?: string
  labelSize?: number
}

interface MarkerProps {
  isSelected: boolean
}

const Container = styled.View`
 flex-direction: row;
 align-items: center;
`;

const MarkerContainer = styled.View<MarkerContainerProps>`
 padding: 3px;
 width: ${({ boxSize }):number => boxSize || 20}px;
 height: ${({ boxSize }):number => boxSize || 20}px;
 background-color: ${({ boxColor }): string => boxColor || '#cecece'};
`;

const Marker = styled.View<MarkerProps>`
 flex: 1;
 justify-content: center;
 align-items: center;
 background-color: ${({ isSelected }): string => isSelected ? 'transparent' : '#ffffff'};
`;

const MarkerImg = styled.Image`
 width: 85%;
 height: 85%;
 tint-color: #ffffff;
 resize-mode: contain;
`;

const Label = styled.Text<LabelProps>`
 font-size: ${({ labelSize }):number => labelSize || 20}px;
 padding-left: 10px;
 color: ${({ labelColor }): string => labelColor || '#000000'};
`;

interface CheckboxGroupProps {
  selectedValue: { label: string; value: string | number; selected: boolean; }[];
  boxSize?: number;
  boxColor?: string;
  labelSize?: number;
  labelColor?: string;
}

interface CheckboxProps {
  boxSize?: number;
  boxColor?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  onPress?: (value: string | number) => void;
  labelSize?: number;
  labelColor?: string;
  item: { label: string; value: string | number; selected: boolean; }
}

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  selectedValue = [],
  boxSize,
  boxColor,
  labelSize,
  labelColor,
}) => {
  const [selected, setSelected] = useState(selectedValue);

  const onSelect = (item) : void => {
    setSelected(selected.map((i) => i.value === item ? { ...i, selected: !i.selected } : i));
  };

  return (
    <Container>
      {selected.map((value, index) => {
        return (
          <Checkbox
            key={index}
            boxSize={boxSize}
            boxColor = {boxColor}
            defaultChecked = {false}
            disabled = {false}
            labelSize = {labelSize}
            onPress = {onSelect}
            labelColor = {labelColor}
            item = {value}
          />
        );
      })}
    </Container>
  );
};

const Checkbox: FC<CheckboxProps> = ({
  boxSize,
  boxColor,
  labelSize,
  labelColor,
  onPress,
  item,
  /* TODO  */
  defaultChecked = false,
  // disabled = false,
}) => {
  const isSelected = item.selected || defaultChecked;

  return (
    <TouchableHighlight
      onPress={(): void => onPress?.(item.value)}
      underlayColor="transparent"
      style={{ marginHorizontal: 20 }}>
      <Container>
        <MarkerContainer
          boxSize={boxSize}
          boxColor={boxColor}
        >
          <Marker isSelected={isSelected}>
            {isSelected && <MarkerImg
              source={require('../__assets__/check_tick.png')}
            />}
          </Marker>
        </MarkerContainer>
        <Label labelSize={labelSize} labelColor={labelColor}>
          {item.label}
        </Label>
      </Container>
    </TouchableHighlight>
  );
};

export { CheckboxGroup, Checkbox };
