// Image.js

import styled from "styled-components";
import React from "react";


const Image = (props) => {
    const { shape, src, size } = props;

    const styles = {
        src: src,
        size:size
    }

    if (shape === "circle") {
        return(
            <ImageCircle {...styles}></ImageCircle>
            )
    }

    return (
        <React.Fragment>

        </React.Fragment>
    )
}

// 동그란 모양의 사진
Image.defaultProps = {
    shape: "circle",
    src: "https://foodsweeat.co.kr/wp-content/uploads/broccoli-1238250_1280-1.jpg",
    size: 36
};

const ImageCircle = styled.div`
    --size:${(props) => props.size}px;
    width:var(--size);
    height:var(--size);
    border-radius:var(--size);

    background-image:url("$(props) => props.src");
    background-size:cover;  //종횡비를 맞춰 줌
    margin:4px; 
`;

export default Image;