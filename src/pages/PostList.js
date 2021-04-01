// PostList.js
import React from "react";
import {useSelector, useDispatch} from "react-redux";

import Post from "../components/Post";
import {actionCreators as postActions} from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";
import {Grid} from "../elements";

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    const user_info = useSelector((state) => state.user.user);
    const is_loading = useSelector((state) => state.post.is_loading);
    const paging = useSelector((state) => state.post.paging);

    const {history} = props;
    
    React.useEffect(() => {
      if(post_list.length < 2){
          dispatch(postActions.getPostFB());
      }
    }, []);

    return (
      <React.Fragment>
        <Grid padding="10px 0px"></Grid>
        <Grid >
          {/* <Post/> */}
          <InfinityScroll
            callNext={() => {
              dispatch(postActions.getPostFB(paging.next));
            }}
            is_next={paging.next ? true : false}
            loading={is_loading}
          >
            {post_list.map((p, idx) => {
              if (p.user_info.user_id === user_info?.uid) {
                return (
                  <Grid
                    auto_margin
                    width="auto"
                    key={p.id}
                    _onClick={() => {
                      history.push(`/post/${p.id}`);
                    }}
                  > <br/>
                    <Post key={p.id} {...p} is_me />
                  </Grid>
                );

              } else {
                return (
                  <Grid
                    key={p.id}
                    auto_margin
                    width="auto"
                    _onClick={() => {
                      history.push(`/post/${p.id}`);
                    }}
                  ><br />
                    {/* id를 받아야지 좋아요가능 */}
                    <Post key={p.id} {...p} />
                  </Grid>
                );
              }
            })}
          </InfinityScroll>
        </Grid>
      </React.Fragment>
    );
}

export default PostList;

