// Grid.js
import React from 'react';
import styled from "styled-components";

const Grid = (props) => {
    const { is_flex, width, padding, margin, bg, children} = props;

    // children
    // <tag> 태그사이에들어가있는 값이 children </tag>

    // children은 스타일 속성이 아니기 때문에 스타일 속성을 가진 친구들만 모아주었다
    const styles = {
        is_flex: is_flex,
        width: width,
        padding: padding,
        margin: margin,
        bg: bg
    };

    return (
        <React.Fragment>
            <GridBox {...styles}>
                {children}
            </GridBox>
        </React.Fragment>
    )
}

// defaultProps으로 기본값 지정
Grid.defaultProps = {
    children: null,
    is_flex: false,
    width: "100%",
    padding: false,
    margin: false,
    bg:false
}

// 속성값들을 전부 넣어 줌
const GridBox = styled.div`
    width:${(props) => props.width};
    height:100%;
    /* 넓이에 선굵기 포함 */
    box-sizing:border-box;
    /* 없으면 속성을 아예 주지않기 위해 삼항식 사용 */
    ${(props) => (props.padding ? `padding : ${props.padding};` : "")}
    ${(props) => (props.margin ? `margin : ${props.margin};` : "")}
    ${(props) => (props.bg ? `background-color : ${props.bg};` : "")}
    /* flex는 여러가지 속성을 한번에 잡아줘야하기 때문에 묶어서 사용 */
    ${(props) => props.is_flex ? `
        display:flex;
        align-items:center;
        justify-content:space-between;
    ` : ""}
    
`;

export default Grid;