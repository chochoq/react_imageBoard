
import React from "react";
import { Text, Input, Grid, Button } from "../elements";


import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";
// import TextField from '@material-ui/core/TextField';


const Login = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const login = () => {
    // 로그인 유효성확인
    // console.log(id);
    if(id === "" || pwd === ""){
      window.alert("이메일 혹은 비밀번호가 공란입니다! 입력해주세요!");
      return;
    }

    if(!emailCheck(id)){
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    // 아이디나 패스워드가 틀릴 때(석세스된 상태값으로 if를 넣고 아닐 때 얼럿띄우기)
    
    dispatch(userActions.loginFB(id, pwd));

  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          Login
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="이메일"
            placeholder="이메일을 입력해주세요."
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="패스워드"
            placeholder="패스워드 입력해주세요."
            type="password"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
            value={pwd}
            is_submit
            onSubmit={login}
          />
        </Grid>

        <Button
          text="로그인하기"
          _onClick={() => {
            login();
          }}></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
