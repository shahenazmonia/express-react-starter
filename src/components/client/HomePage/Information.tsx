import React, { StatelessComponent } from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';

const BorderedDiv = styled.div`
	display: flex;
	border: 2px solid black;
	margin-top: 20px;
`;

const Title = styled.h3`
	align-self: center;
	color: #000;
`;

const IconComp = styled(Icon)`
    font-size : 50px;
    align-self : center;
    margin:20px;
`;

const Information: StatelessComponent<{}> = (props) => {
	return (
		<div>
			<BorderedDiv>
				<IconComp type="notification" />
				<Title>Acil Durum 112</Title>
			</BorderedDiv>
			<BorderedDiv>
				<IconComp type="lock" />
				<Title>Sitemiz güvenlidir</Title>
			</BorderedDiv>
		</div>
	);
};

export default Information;
