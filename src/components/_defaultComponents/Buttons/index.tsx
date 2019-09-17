import styled from "styled-components";
import { Button } from "antd";
import React from "react";

export const PrimaryButton = styled(Button)<{ backgroundColor: string }>`
  border: none;
  border-radius: 50%;
  background-color: ${props => props.backgroundColor || props.theme.colors.primaryBlack};
`;

export const SecondaryButton = props => <Button {...props} />;
