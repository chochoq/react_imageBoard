import { createAction, handleActions } from "redux-actions";

// 불변성 관리
import { produce } from "immer";

// 리얼타임 데이터베이스
import { firestore, realtime } from "../../shared/firebase";

// 시간체크를 위한 모멘트
import "moment";
import moment from "moment";

// 파이어베이스
import firebase from 'firebase/app';

// 리덕스
import { actionCreators as postActions } from './post';


const addLikeFB = (user_id, post_id) => {
    return function (dispatch, getState, { history }) {
        // 포스트 정보 DB
        const postDB = firestore.collection('post');
        // 리덕스의 유저 정보 가져오기
        const user_info = getState().user.user;
        // 해당하는 포스트 번호를 가진 정보 가져오기
        const post = getState().post.list.find(l => l.id === post_id);

        const like_cnt = post.like_cnt;
        // 좋아요 수 증가시키기
        const increment = firebase.firestore.FieldValue.increment(1);
        postDB.doc(post_id).update({ like_cnt: increment }).then((_post => {
        console.log(post_id);

        if (post) {

            dispatch(postActions.editPost(post_id, { like_cnt: parseInt(post.like_cnt) + 1, }));
            // 자기 게시물 좋아요는 기록하지 않기
            if (post.user_info.user_id === user_info.uid) {
            return
            }
            // 리얼타임 데이터베이스
            const _like_item = realtime.ref(`like/${post.user_info.user_id}/list`).push();

            _like_item.set({
            post_id: post.id,
            user_name: user_info.user_name,
            image_url: post.image_url,
            time: moment().format('YYYY-MM-DD hh:mm:ss'),
            }, (err) => {
            if (err) {
                console.log('알림 저장 실패');
            } else {
                const likeDB = realtime.ref(`like/${post.user_info.user_id}`)

                likeDB.update({ check: false });
            }
            })
        }
        }))
    }
}

const deleteLikeFB = (user_id, post_id) => {
    return function (dispatch, getState, { history }) {
        // 포스트 정보 DB
        const postDB = firestore.collection('post');
        // 리덕스의 유저 정보 가져오기
        const user_info = getState().user.user;
        // 해당하는 포스트 번호를 가진 정보 가져오기
        const post = getState().post.list.find(l => l.id === post_id);

        const like_cnt = post.like_cnt;
        // 좋아요 수 증가시키기
        const increment = firebase.firestore.FieldValue.increment(-1);
        postDB.doc(post_id).update({ like_cnt: increment }).then((_post => {
        console.log(post_id);

        if (post) {

            dispatch(postActions.editPost(post_id, { like_cnt: parseInt(post.like_cnt) - 1, }));


            // 리얼타임 데이터베이스
            const _like_item = realtime.ref(`like/${post.user_info.user_id}/list`).push();

            _like_item.set({
            post_id: post.id,
            user_name: user_info.user_name,
            image_url: post.image_url,
            time: moment().format('YYYY-MM-DD hh:mm:ss'),
            }, (err) => {
            if (err) {
                console.log('알림 저장 실패');
            } else {
                const likeDB = realtime.ref(`like/${post.user_info.user_id}`)

                likeDB.update({ check: false });
            }
            })
        }
        }))
    }
}


const actionCreators = {
    addLikeFB,
    deleteLikeFB,
};

export { actionCreators };