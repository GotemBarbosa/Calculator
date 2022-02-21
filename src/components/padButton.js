import React from "react";
import styled from "styled-components";

const FunctionButton = styled.button`
        height: 3.5rem;
        width: 3.5rem;
        background-color: ${(props) => props.color};
        border-radius: 100%;
        margin: 2px;
        border: none;
        cursor: pointer;
        display: flex:
        justify-content: center;
        align-itens: center;
        &:hover {
            background-color: ${(props) => props.hoverColor};
        }
        position: relative
    `;
const Text = styled.text`
  font-weight: 700;
  font-size: 16px;
`;

export default function PadButton(props, onClick) {
  return (
    <FunctionButton
      color={props.color}
      hoverColor={props.hoverColor}
      onClick={props.onClick}
    >
      <Text>{props.children}</Text>
    </FunctionButton>
  );
}
