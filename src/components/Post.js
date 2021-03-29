import React from 'react';
import Grid from '../elements/Grid';

const Post = () => {
    
    return (
        <React.Fragment>
            <Grid padding = "16px">
                <div>유저프로필/ 유저이름/ 게시글 작성시간/ 나인지확인하는버튼(수정)</div>
                <div>게시물내용</div>
                <div>사진</div>
                <div>댓글갯수</div>
            </Grid>
        </React.Fragment>
    )
}

// props가 없어서 오류가 날것을 방지해 미리 defaultProps를 넣어준다
Post.defaultProps = {
    user_info: {
        user_name: "보로꼬리",
        user_profile: "https://foodsweeat.co.kr/wp-content/uploads/broccoli-1238250_1280-1.jpg"
    },
    image_url:"https://foodsweeat.co.kr/wp-content/uploads/broccoli-1238250_1280-1.jpg",
    contents: "안녕하세요 보로꼬리입니다 만관잘부",
    comment_cnt: 10,
    insert_dt:"2021-02-02 11:00:00",
    
};

export default Post;