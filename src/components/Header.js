
import React from "react";
import { Grid, Text, Button } from "../elements";
import RadioButtons from '../components/RadioButton';

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SvgIcon from '@material-ui/core/SvgIcon';


const drawerWidth = "30%";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > svg': {
      margin: theme.spacing(2),
    },
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

function HomeIcon(props) {
  return (
    <SvgIcon {...props} >
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Header = (props) => {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const post_list = useSelector((state) => state.post.list);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

  const is_session = sessionStorage.getItem(_session_key)? true : false;
  
  // console.log(is_session);

  // layout_type을 정하는 부분입니다!
  const [layout_type, setLayoutType] = React.useState(
    post_list ? post_list.layout_type : ""
  );

  // 레이아웃 타입을 정해주는 함수
  // useState를 이용해요!
  const changeLayoutType = (e) => {
    setLayoutType(e.target.value);
  };


  if (is_login && is_session) {
    return (
      <React.Fragment>
        <Grid is_flex padding="4px 16px">
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <Button margin="0px" size="24px" bold
                _onClick={() => {
                  history.push("/");
                }}>
                ChonTerest 
              </Button>
              
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerOpen}
                  className={clsx(open && classes.hide)}
                >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              {/* {['chonterest', 'logout'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ?
                    <HomeIcon> </HomeIcon> : <ExitToAppIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))} */}
              
              {/* todo */}
              <Button margin="0px" size="24px" bold
                _onClick={() => {
                  history.push("/");
                }}>
              홈으로
              </Button>

              <Button
                text="로그아웃"
                _onClick={() => {
                  dispatch(userActions.logoutFB());
                }}
              ></Button>
              <Divider />
            <Text margin="20px" size="10px" bold>
              레이아웃 설정
              <RadioButtons
              type="text"
              value={layout_type}
              _onChange={changeLayoutType}
              label="레이아웃 타입"
              ></RadioButtons>
            </Text>
            </List>
            
            <Divider />
          </Drawer>
            
          
        </Grid>
      </React.Fragment>
    );

  }return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <Button  bold
              _onClick={() => {
                  history.push("/");
                  }}>
                  ChonTerest
                </Button>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerOpen}
                  className={clsx(open && classes.hide)}
                >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronLeftIcon/> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
          <List>
            
            {/* {['Login', 'JoinUs'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ?<VpnKeyIcon/> : <EmojiEmotionsIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
            <Button margin="0px" size="24px" bold
                _onClick={() => {
                  history.push("/");
                }}>
              홈으로
              </Button>
            <Button
              text="로그인"
            _onClick={() => {
              history.push("/login");
              
            }}
          ></Button>
          <Button
            text="회원가입"
            _onClick={() => {
              history.push("/signup");
            }}
            ></Button>
            <Divider />
            <Text margin="20px" size="10px" bold>
              레이아웃 설정
              <RadioButtons
              value={layout_type}
              _onChange={changeLayoutType}
              label="레이아웃 타입"
              ></RadioButtons>
            </Text>
          </List>
          <Divider />
        </Drawer>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
