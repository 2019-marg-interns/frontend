import { put, take, call, fork, select, spawn } from 'redux-saga/effects'
//import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import * as actions from './../../actions/index'
import { TO_GROUP_DETAIL, TO_EDIT_DESIGN, EDIT_DESIGN_NAME } from './../../actions/types'

var xhr = require('xhr-promise-redux');

//const front_url = "http://localhost:3000";
const fixed_url = "http://localhost:8000/";
const auth_check_url = fixed_url+'auth/';

// 이제 backend에서 사용하는 url은 모두 'path_name/'의 형식을 따르고, frontend에서 사용하는 url은 모두 '/path_name/'의 형식을 따릅니다.

// localStorage: 현재 사용하고 있는 브라우저 상에 스테이트를 저장하는데 사용.
// 무려 크롬을 종료했다 시작해도 정보가 저장되어 있어요!
// state의 경우 현재 페이지에서만 유지됩니다. (다른 페이지로 이동 시 리셋되기 때문에 새로 스테이트를 세팅해줘야 합니다. - 이 기능을 하는게 watchLoginState)
// localStorage에 들어갈 정보
//   1. "auth" - 아이디 및 비밀번호 (Base64로 encoding된 버전)
//   2. "parent" - articleDetailPage에서 원글 확인 & writePage에서 댓글 / 일반 포스팅 구분을 위한 parent article의 id
// localStorage의 정보를 넣기/가져오기/삭제하기
//      (1) 가져오기: localStorage.getItem('data_name') / localStorage['data_name']
//      (2) 넣기: localStorage.setItem('data_name', data) / localStorage['data_name'] = data
//      (3) 삭제하기: localStorage.removeItem('data_name')
const localStorage = window.localStorage;


// saga: 미들웨어에서 돌아갈 함수
export default function *saga() {
    const path = window.location.pathname;
    console.log("pathname: ", window.location.pathname)
    switch(window.location.pathname) {
        case '/':
            yield spawn(mainPageSaga);
            break;
        case '/log_in/':
            yield spawn(loginPageSaga);
            break;
        case '/main/':
            yield spawn(loggedInMainPageSaga);
            break;
        case '/sign_up/':
            yield spawn(signUpPageSaga);
            break;
        default:
            const url = path.split("/");
            switch(url[1]) {
                case 'profile':
                    yield spawn(profilePageSaga);
                    break;
                case 'group':
                    yield spawn(groupDetailPageSaga);
                    break;
                default:
                    console.log("default state");
                    alert("없는 장소입니다.");
                    if(localStorage.getItem("auth") === null) {
                        // localStorage.removeItem('parent');
                        yield put(actions.changeUrl('/'));
                    } else {
                        // localStorage.removeItem('parent');
                        yield put(actions.changeUrl('/main/'));
                    }
            }
    }
}


///// Page별 saga함수
// 여러 기능들을 한 함수에 묶어서 saga함수에 추가할 때 예쁘게 추가하는 용도
//////////////////////////////////////////////////
// Page별 saga함수 작성 규칙
// 1. 페이지명을 포함하는 직관적인 이름의 함수를 정의한다.
//   (ex. 로그인 페이지를 작성할 경우 loginPageSaga)
// 2. 페이지의 url을 예쁘게(<<<<<중요>>>>>) 정의한다.
//   (좋은 예: 메인 페이지의 url - '/main/', 나쁜 예: 메인 페이지의 url - '/sogaewonsil_real_geukhyum/')
// 3. switch문의 케이스에 추가한다.
//   (ex. 메인페이지 추가 - case '/main/': yield spawn(mainPageSaga); break;)
// 4. 페이지 이동은 yield put(actions.changeUrl('/target_path/'))를 이용하시면 됩니다.
//////////////////////////////////////////////////
function *loginPageSaga() {
    console.log("Login Page Saga");
    yield spawn(watchLoginState);
    yield spawn(watchSignIn);
    yield spawn(watchSignUp);
}

function *signUpPageSaga() {
    console.log("Sign Up Page Saga")
    yield spawn(watchLoginState);
    yield spawn(watchPostSignUp);
}

function *mainPageSaga() {
    console.log("Main Page Saga");
    yield spawn(watchLoginState);
    yield spawn(watchGoToMain);
}

function *loggedInMainPageSaga() {
    console.log("Logged In Main Page Saga");
    yield spawn(watchLoginState);

    yield spawn(watchSignOut);
    yield spawn(watchGoToMain);

    yield spawn(watchToProfile);
    yield spawn(watchGoToGroupDetail);
   
    yield spawn(watchSaveDesign);
    yield spawn(watchEditDesignName);
}

function *profilePageSaga() {
    console.log("Profile Page Saga");
    yield spawn(watchLoginState);
    yield spawn(watchSignOut);
    yield spawn(watchGoToMain);
    yield spawn(watchPWChange);
    yield spawn(watchIntroChange);
    yield spawn(watchEscape);
}


function *groupDetailPageSaga() {
    console.log("Group Detail Page Saga");
    yield spawn(watchLoginState);
    yield spawn(watchSignOut);
    yield spawn(watchGoToMain);

    yield spawn(watchToEditDesign);
   
    yield spawn(watchGoToGroupDetail);

}





///// Page별 saga함수에서 쓸 saga함수들 (watch 함수 편)
// watchLoginState: 브라우저에서의 로그인 여부 확인 및 state 업데이트
// <<주의>> 새로운 Page를 추가할 경우 PageSaga함수에 반드시 추가할 것
// <<주의>> 새로운 state를 추가할 경우 try-catch문을 이용해 정보를 받아온 후 스테이트에 업데이트 해야 함
function *watchLoginState() {
    console.log("pathname: ", window.location.pathname)

    /* 
     *   url 마지막에 '/'가 없는 경우
     */
    if(window.location.pathname[window.location.pathname.length-1] !== '/') {
        console.log("without /")
        yield put(actions.changeUrl(window.location.pathname+'/'));
        return;
    }

    if(window.location.pathname === '/' || window.location.pathname === '/sign_up/' || window.location.pathname === '/log_in/') {      
        /* 
         *   로그인 되어 있는 상태로 가입, 로그인, 초기 페이지에 접근하는 경우
         */
        if(localStorage.getItem("auth") !== null) {
            yield put(actions.changeUrl('/main/'));
        }
        
        /* 
         *   로그인 되어 있지 않은 상태로 가입, 로그인, 초기 페이지에 접근하는 경우
         */
        else {
            
            yield put(actions.setState({
                authorization: "",
                
                load: 0,
                loading: true
            }))
        }
    }

    else {
        /* 
         *   로그인 되어 있지 않은 상태로 접근 불가 페이지에 접근하는 경우
         */
        if(localStorage.getItem("auth") === null) {
            yield put(actions.changeUrl('/'));
        }

        /* 
         *   로그인 되어 있는 상태
         */
        else {
            const path = window.location.pathname;
            let username = window.atob(localStorage.getItem("auth")).split(":")[0]
            console.log("username: ", username)
            console.log(yield select())
            let data, parent_data;

            /* =====================================================================================
                                                    메인 페이지                      
            =======================================================================================*/
            if(path === '/main/') { 
                let profile_user_data, my_groups_data, now_design_data;

                // 유저 정보
                try{
                    profile_user_data = yield call(xhr.get, fixed_url+'profile/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic '+localStorage['auth'],
                            Accept: 'application/json'
                        },
                        responsetype: 'json',
                    });
                    console.log("GET profile_user data: ", profile_user_data.body)
                } catch(error) {
                    console.log("profile_user loading error")
                    console.log(error)
                    alert("데이터 로딩에 실패했습니다.")
                }

                // 현재 디자인 정보
                try{
                    now_design_data = yield call(xhr.get, fixed_url+'', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic '+localStorage['auth'],
                            Accept: 'application/json'
                        },
                        responsetype: 'json',
                    });
                    console.log("GET now_design data: ", now_design_data.body)
                } catch(error) {
                    console.log("now_design loading error")
                    console.log(error)
                    alert("데이터 로딩에 실패했습니다.")
                }

                // 내 그룹 정보
                try {
                    my_groups_data = yield call(xhr.get, fixed_url+'groups/'+username+'/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic '+localStorage['auth'],
                            Accept: 'application/json'
                        },
                        responseType: 'json',
                    });
                    console.log("GET my groups data: ", my_groups_data.body)
                } catch(error) {
                    console.log("my_groups loading error")
                    console.log(error)
                    alert("데이터 로딩에 실패했습니다.");
                }

                yield put(actions.setState({
                    authorization: window.atob(localStorage['auth']),
                    profile_user: profile_user_data.body,
                    now_design: now_design_data.body,
                    my_groups: my_groups_data.body,
                    load: 0,
                    loading: true
                    //TODO 이후 state 추가 시 여기에 스테이트 업데이트 추가
                }));
            }


            /* =====================================================================================
                                                    그룹 페이지                      
            =======================================================================================*/
            else if(path === '/groups/') {
                console.log("get group details...");
                let profile_user_data, all_groups_data, my_groups_data;

                // 유저 정보
                try{
                    profile_user_data = yield call(xhr.get, fixed_url+'profile/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic '+localStorage['auth'],
                            Accept: 'application/json'
                        },
                        responsetype: 'json',
                    });
                    console.log("GET profile_user data: ", profile_user_data.body)
                } catch(error) {
                    console.log("profile_user loading error")
                    console.log(error)
                    alert("데이터 로딩에 실패했습니다.")
                }

                // 전체 그룹 정보
                try{
                    all_groups_data = yield call(xhr.get, fixed_url+'groups/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic '+localStorage['auth'],
                            Accept: 'application/json'
                        },
                        responseType: 'json',
                    });
                    console.log("GET all groups data: ", all_groups_data.body)
                } catch(error){
                    console.log("all_groups loading error")
                    console.log(error)
                    alert("데이터 로딩에 실패했습니다.")
                }

                // 내 그룹 정보
                try{
                    my_groups_data = yield call(xhr.get, fixed_url+'groups/'+username+'/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic '+localStorage['auth'],
                            Accept: 'application/json'
                        },
                        responseType: 'json',
                    });
                    console.log("GET my groups data: ", my_groups_data.body)
                } catch(error){
                    console.log("my_groups loading error")
                    console.log(error)
                    alert("데이터 로딩에 실패했습니다.")
                }

                yield put(actions.setState({
                    authorization: window.atob(localStorage['auth']),
                    profile_user: profile_user_data.body,
                    all_groups: all_groups_data.body,
                    my_groups: my_groups_data.body,
                    filtered_groups: all_groups_data.body,
                    load: 0,
                    loading: true,
                }))
            }


            /* 
             *   username 또는 id를 기준으로 backend에 겟을 날리는 경우 - 프로필, 그룹 디테일, 그룹 관리 페이지 
             */
            else {
                const username = path.split("/")[2];
                const id = path.split("/")[2];

                if (username === undefined || username === '') {
                    console.log("404 not found");
                    alert("없는 장소입니다.");
                    if(localStorage.getItem("auth") === null) {
                        // localStorage.removeItem('parent');
                        yield put(actions.changeUrl('/'));
                    } else {
                        // localStorage.removeItem('parent');
                        yield put(actions.changeUrl('/main/'));
                    }
                    return;
                }


            /* =====================================================================================
                                                    프로필 페이지                      
            =======================================================================================*/
                else if(path.split("/")[1] === 'profile'){
                    console.log("get profile id & pw details...");
                    let profile_id_pw_data, profile_user_data = null;

                    // 유저 아이디/비밀번호 정보
                    try{
                        profile_id_pw_data = yield call(xhr.get, fixed_url+'users/'+username+'/',{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                                Accept: 'application/json'
                            },
                            responseType: 'json'
                        });
                        console.log("GET profile_id_pw_data: ", profile_id_pw_data.body)
                    } catch(error){
                        console.log("profile data loading error")
                        console.log(error)
                        alert("데이터 로딩에 실패했습니다.");
                    }

                    // 유저 정보
                    try{
                        profile_user_data = yield call(xhr.get, fixed_url+'profile/', {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                                Accept: 'application/json'
                            },
                            responsetype: 'json',
                        });
                        console.log("GET profile_user data: ", profile_user_data.body)
                    } catch(error) {
                        console.log("profile_user loading error")
                        console.log(error)
                        alert("데이터 로딩에 실패했습니다.")
                    }

                    yield put(actions.setState({
                        authorization: window.atob(localStorage['auth']),
                        profile_id_pw: profile_id_pw_data.body,
                        profile_user: profile_user_data.body,
                        load: 0,
                        loading: true
                    }));
                }


            /* =====================================================================================
                                                그룹 디테일 페이지                      
            =======================================================================================*/
                else if(path.split("/")[1] === 'group') {
                    console.log("get group details...");
                    console.log("group id: ", id);
                    let username = window.atob(localStorage.getItem("auth")).split(":")[0]
                    let profile_user_data, now_group_data, my_groups_data, group_designs_data, my_designs_data = null;

                    // 유저 정보
                    try{
                        profile_user_data = yield call(xhr.get, fixed_url+'profile/', {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                                Accept: 'application/json'
                            },
                            responsetype: 'json',
                        });
                        console.log("GET profile_user data: ", profile_user_data.body)
                    } catch(error) {
                        console.log("profile_user loading error")
                        console.log(error)
                        alert("데이터 로딩에 실패했습니다.")
                    }

                    // 현재 그룹 정보
                    try{
                        now_group_data = yield call(xhr.get, fixed_url+'groups/'+id+'/admin/',{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                                Accept: 'application/json'
                            },
                            responseType: 'json'
                        });
                        console.log("GET now_group_data: ", now_group_data.body)
                    } catch(error){
                        if(error.statusCode === 403) {
                            console.log("you are not permitted");
                            alert("가입하지 않은 그룹입니다")
                            yield put(actions.changeUrl('/groups/'))
                        }
                        else {
                            console.log("now group data loading error")
                            console.log(error)
                            alert("데이터 로딩에 실패했습니다.");
                        }
                    }

                    // 내 그룹 정보
                    try{
                        my_groups_data = yield call(xhr.get, fixed_url+'groups/'+username+'/', {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                                Accept: 'application/json'
                            },
                            responseType: 'json',
                        });
                        console.log("GET my_groups_data: ", my_groups_data.body)
                    } catch(error){
                        console.log("my_groups loading error")
                        console.log(error)
                        alert("데이터 로딩에 실패했습니다.")
                    }

                    // 그룹 디자인 정보
                    try{
                        group_designs_data = yield call(xhr.get, fixed_url+'groups/'+id+'/',{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                                Accept: 'application/json'
                            },
                            responseType: 'json'
                        });
                        console.log("GET group_designs_data: ", group_designs_data.body)
                    } catch(error) {
                        if(error.statusCode === 403) {
                            console.log("you are not permitted");
                            alert("가입하지 않은 그룹입니다")
                            yield put(actions.changeUrl('/groups/'))
                        }
                        else {
                            console.log("group designs data loading error")
                            console.log(error)
                            alert("데이터 로딩에 실패했습니다.");
                        }

                    }

                    // 내 디자인 정보
                    try{
                        my_designs_data = yield call(xhr.get, fixed_url+'groups/'+profile_user_data.body["user_group"]+'/',{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                                Accept: 'application/json'
                            },
                            responseType: 'json'
                        });
                        console.log("GET my_designs_data: ", my_designs_data.body)
                    } catch(error) {
                        console.log("my designs data loading error")
                        console.log(error)
                        alert("데이터 로딩에 실패했습니다.");
                    }


                    yield put(actions.setState({
                        authorization: window.atob(localStorage['auth']),
                        profile_user: profile_user_data.body,
                        now_group: now_group_data.body[0],
                        my_groups: my_groups_data.body,
                        group_designs: group_designs_data.body,
                        my_designs: my_designs_data.body,
                        load: 0,
                        loading: true
                    }))
                    console.log("setState finished")
                }


            /* =====================================================================================
                                                그룹 관리 페이지                      
            =======================================================================================*/
                else if(path.split("/")[1] === 'admin') {
                    console.log("get group admins...");
                    console.log("group id: ", id);
                    let profile_user_data, now_group_data, group_users_data, group_designs_data = null;

                    // 유저 정보
                    try{
                        profile_user_data = yield call(xhr.get, fixed_url+'profile/', {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                                Accept: 'application/json'
                            },
                            responsetype: 'json',
                        });
                        console.log("GET profile_user data: ", profile_user_data.body)
                    } catch(error) {
                        console.log("profile_user loading error")
                        console.log(error)
                        alert("데이터 로딩에 실패했습니다.")
                    }

                    // 현재 그룹 정보
                    try{
                        now_group_data = yield call(xhr.get, fixed_url+'groups/'+id+'/admin/',{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                                Accept: 'application/json'
                            },
                            responseType: 'json'
                        });
                        console.log("GET now_group_data: ", now_group_data.body)
                    } catch(error){
                        console.log("now group data loading error")
                        console.log(error)
                        alert("데이터 로딩에 실패했습니다.");
                    }

                    // 그룹 유저 정보
                    try{
                        group_users_data = yield call(xhr.get, fixed_url+'groups/'+id+'/members/',{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                                Accept: 'application/json'
                            },
                            responseType: 'json'
                        });
                        console.log("GET group_users_data: ", group_users_data.body)
                    } catch(error){
                        console.log("group users data loading error")
                        console.log(error)
                        alert("데이터 로딩에 실패했습니다.");
                    }

                    // 그룹 디자인 정보
                    try{
                        group_designs_data = yield call(xhr.get, fixed_url+'groups/'+id+'/',{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                                Accept: 'application/json'
                            },
                            responseType: 'json'
                        });
                        console.log("GET group_designs_data: ", group_designs_data.body)
                    } catch(error){
                        console.log("group designs data loading error")
                        console.log(error)
                        alert("데이터 로딩에 실패했습니다.");
                    }

                    yield put(actions.setState({
                        authorization: window.atob(localStorage['auth']),
                        profile_user: profile_user_data.body,
                        now_group: now_group_data.body[0],
                        group_users: group_users_data.body,
                        group_designs: group_designs_data.body,
                        load: 0,
                        loading: true
                    }))
                }

                else {
                    alert("없는 장소입니다.");
                    yield put(actions.changeUrl('/main/'))
                }
            }
        }
    }
    console.log("after watchLoginState : ", yield select());
}

// watchSignIn: 로그인 버튼 클릭 관찰
function *watchSignIn() {
    while(true) {
        const data = yield take(actions.SIGN_IN);
        yield call(signIn, data);
    }
}

// watchSignUp: 회원가입 버튼 클릭 관찰
function *watchSignUp() {
    while(true) {
        yield take('GOTO_SIGN_UP');
        yield put(actions.changeUrl('/sign_up/'));
    }
}

// watchSignOut: 로그아웃 버튼 클릭 관찰
function *watchSignOut() {
    while(true) {
        yield take('SIGN_OUT');
        localStorage.removeItem('auth');
        // localStorage.removeItem('parent');
        yield put(actions.changeUrl('/'));
    }
}

// watchPostSignUp: 회원가입 페이지에서 가입 버튼 클릭 관찰
function *watchPostSignUp() {
    while(true) {
      console.log("here");
        const data = yield take('POST_SIGN_UP');
        console.log(data);
        yield call(signUp, data);
    }
}



// watchGoToMain: 메인으로 돌아가기 버튼 클릭 관찰 및 리다이렉트
function *watchGoToMain() {
    while(true) {
        yield take('POST_BACK');
        yield put(actions.changeUrl('/main/'));
    }

}

function *watchToProfile() {
    while(true) {
        const data=yield take('TO_PROFILE');
        yield put(actions.changeUrl('/profile/' + data.profuser + '/'));
    }
}
function *watchIntroChange(){
    while(true){
        const data = yield take('TO_INTRO_CHANGE');
        console.log("##"+data.user);
        yield call(updateIntro, data.user, data.myname, data.mybelong, data.myintro, data.removeImg, data.changeImg, data.img);
    }
}
function *watchPWChange(){
    while(true){
        const data = yield take('TO_PW_CHANGE');
        console.log("**get PW change action");
        yield call(updatePW, data.profuser, data.newpw);
    }
}
function *watchEscape(){
    while(true){
        const data = yield take('TO_ESCAPE');
        console.log("**get excape action");
        yield call(escapeBook, data.profuser);
    }
}



//watchGoToGroupDetail: GroupPage 혹은 MainPage에서 MyGroupList의 그룹 클릭 관찰 및 리다이렉트(클릭한 그룹 detail 페이지로)
function *watchGoToGroupDetail() {
	while(true) {
        const data = yield take('TO_GROUP_DETAIL');
        console.log("watchGoToGroupDetail")
		yield call(toGroupDetail, data);
		//yield put(actions.changeUrl('/group/' + data.groupname + '/'));
	}
}

function *watchEditDesignName() {
    while(true) {
        const data = yield take('EDIT_DESIGN_NAME');
        console.log("watchEditDesignName");
        yield call(editDesignName, data);
    }
}

function *watchToEditDesign() {
    while(true) {
        const data = yield take('TO_EDIT_DESIGN');
        console.log("watchToEditDesign");
        yield call(toEditDesign, data);
    }
}


function *watchSaveDesign() {
    while(true) {
        const data = yield take('SAVE_DESIGN');
        console.log("watchSaveDesign");
        yield call(saveDesign, data);
    }
}

function *watchPostDesign() {
    while(true) {
        const data = yield take('POST_DESIGN');
        console.log("watchPostDesign");
        yield call(postDesign, data);
    }
}


///// Page별 saga함수에서 쓸 saga함수 (그 외)
// signIn: 백엔드에 get을 날리는 함수
function *signIn(data) {
    const encodedData = window.btoa(data.username + ":" + data.password);
    try {
        yield call(xhr.get, auth_check_url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic '+ encodedData,
                Accept: 'application/json'
            },
            responseType: 'json'
        })
        console.log("Login Success without exception");
        localStorage.setItem("auth", encodedData);
        yield put(actions.changeUrl('/main/'));
    }
    catch(error) {
        alert("아이디 또는 비밀번호를 다시 확인해주세요.");
        console.log(error)
    }
}

// signUp: 백엔드 users POST를 날리는 함수
function *signUp(data) {
    try {
        yield call(xhr.post, fixed_url + 'users/', {
            headers: {
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            contentType:'json',
            body: JSON.stringify({"username": data.username, "password": data.password})
        });
        console.log("post article succeed 1");
        localStorage.setItem("auth", window.btoa(data.username + ":" + data.password));
        yield put(actions.changeUrl('/main/'));
    }
    catch(error) {
        if(error.statusCode === 405) {
            console.log("already existing name");
            alert("이미 있는 username입니다")
        }
        else if(error.statusCode === 405) {
            console.log("too short or long user name");
            alert("username은 4글자 이상, 20글자 이하여야 합니다.")
        }
        else {
            console.log(error)
            alert("회원가입에 실패했습니다.");
        } 
    }
}



// 비밀번호 바꾼 걸 put 요청 보내는 함수
function *updatePW(profuser, newpw){
    const backPath = 'users/'+profuser+'/';
    try{
        yield call(xhr.send, fixed_url+backPath, {
            method: 'PUT',
            headers: {
                "Authorization": "Basic "+localStorage['auth'],
                "Content-Type": 'application/json',
                Accept: 'application/json',
            },
            responseType:'json',
            body: JSON.stringify({"username": profuser, "password": newpw})
        });
        console.log("put password succeed ");
        localStorage.setItem("auth", window.btoa(profuser + ":" + newpw));
        //auto sign out
        yield put(actions.changeUrl('/main/'));
    }catch(error){
        alert("비밀번호를 변경할 수 없습니다.");
        return;
    }
}
// profile을 수정한걸 post요청보내는 함수
function *updateIntro(profuser, myname, mybelong, myintro, removeImg, changeImg, img){
    const backPath = 'users/'+profuser+'/profile/';
    try {
        let form = new FormData();
        form.append('user', profuser);
        form.append('myname', myname);
        form.append('mybelong', mybelong);
        form.append('myintro', myintro);
        if(removeImg === true && changeImg === true && img !== null)
            form.append('myimage', img);
        else if(removeImg === true)
            form.append('myimage', null);
        yield call(xhr.send, fixed_url + backPath, {
            method: 'PUT',
            headers: {
                "Authorization": "Basic " + localStorage['auth'],
            },
            async: true,
            crossDomain: true,
            processData: false,
            contentType: false,
            mimeType: "multipart/form-data",
            body: form
        });
        console.log("put profile succeed");

        yield put(actions.changeUrl('/profile/'+profuser+'/'))
    } catch(error){

            console.log("프로필을 변경할 수 없습니다.");
            return ;

    }
}
function *escapeBook(profuser){
    const backPath = 'users/'+profuser+'/';
    try{
        yield call(xhr.send, fixed_url+backPath,{
            method : 'DELETE',
            headers:{
                'Authorization': 'Basic '+localStorage['auth'],
                Accept: 'application/json'
            },
            responseType: 'json',
        });
        console.log("delete account succeed!");
        localStorage.removeItem('auth');
        yield put(actions.changeUrl('/'));
    }catch(error){
        alert("탈퇴에 실패했습니다.");
        return ;

    }
}



function *toGroupDetail(data){
    console.log("toGroupDetail")
    try {
        yield put(actions.changeUrl('group/' + data.groupid + '/'));
    } catch(error) {
        console.log(error)
        alert("그룹 페이지로 이동할 수 없습니다.")
    }
}

function *toAdminGroup(data){
    console.log("toAdminGroup")
    try {
        yield put(actions.changeUrl('admin/' + data.groupid + '/'));
    } catch(error) {
        console.log(error)
        alert("그룹 관리자 페이지로 이동할 수 없습니다.")
    }
}



function *editDesignName(data) {
    console.log("editDesignName")
    const path = 'groups/edit/' + data.designid + '/';
    try{
        yield call(xhr.send, fixed_url+path, {
            method: 'PUT',
            headers: {
                "Authorization": "Basic "+localStorage['auth'],
                "Content-Type": 'application/json',
                Accept: 'application/json',
            },
            responseType:'json',
            body: JSON.stringify({"name": data.name})
        });
        console.log("edit design name succeed ");
        // yield put(actions.changeUrl(window.location.pathname));
    }catch(error){
        alert("디자인 이름 수정에 실패했습니다.");
        return;
    }
}

function *toEditDesign(data) {
    console.log("toEditDesign")
    const path = 'groups/edit/' + data.designid + '/';
    try {
		yield call(xhr.get, fixed_url + path, {
            headers: {
                "Authorization": "Basic " + localStorage['auth'],
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            contentType: 'json'
        });
        yield put(actions.changeUrl('/main/'));
    } catch(error){
        console.log(error)
        alert("디자인을 수정할 수 없습니다.")
    }
}



function *giveAdmin(data) {
    console.log("giveAdmin groupid: ", data.groupid, " userid: ", data.userid)
    const backPath = 'groups/'+data.groupid+'/members/'+data.userid+'/';
    try {
        yield call(xhr.send, fixed_url+backPath, {
            method: 'PUT',
            headers: {
                "Authorization": "Basic "+localStorage['auth'],
                "Content-Type": 'application/json',
                Accept: 'application/json',
            },
            responseType:'json',
            // body: JSON.stringify({"username": profuser, "password": newpw})
        });
        console.log("give admin to userid: ", data.userid);
        yield put(actions.changeUrl(window.location.pathname));
    }catch(error){
        console.log(error)
        alert("관리자 권한을 줄 수 없습니다.");
        return;
    }
}




function *saveDesign(data) {
    console.log("saveDesign designid: ", data.designid, " designname: ", data.designname, " design: ", data.design, " text: ", data.text, " image: ", data.image, " logo: ", data.logo)
    const backPath = '';
    let profile_user_data, design_data = null;

    console.log("auth: ", localStorage['auth'])
    // 로그인 되지 않은 상태에서의 저장
    if(localStorage['auth'] === undefined) {
        console.log("로그인 없이 저장")
        try{
            design_data = yield call(xhr.send, fixed_url+backPath, {
                method: 'PUT',
                headers: {
                    // "Authorization": "Basic "+localStorage['auth'],
                    "Content-Type": 'application/json',
                    Accept: 'application/json',
                },
                responseType:'json',
                body: JSON.stringify({
                    "id": data.designid,
                    "name": data.designname,
                    "design": {
                        "body": data.design["body"],
                        "sleeve": data.design["sleeve"],
                        "banding": data.design["banding"],
                        "stripe": data.design["stripe"],
                        "button": data.design["button"],
                    },
                    "text": data.text,
                    "image": {
                        "frontImg": data.image["frontImg"],
                        "backImg": data.image["backImg"]
                    },
                    "logo": {
                        "front": data.logo["front"],
                        "back": data.logo["back"]
                    }
                })
            });
            console.log("save design succeed design id: ", design_data.body.id);
            yield put(actions.changeUrl("/log_in/", design_data.body.id))
            // if(confirm("저장되었습니다.\n저장된 디자인을 확인하시겠습니까?") === true) 
                // yield put(actions.changeUrl('group/'+profile_user_data.body['user_group']+'/'))
        }catch(error){
            console.log(error)
            alert("저장에 실패했습니다.");
            return;
        }
    }
    
    // 로그인 된 상태에서의 저장
    else {
        try{
            profile_user_data = yield call(xhr.get, fixed_url+'profile/',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+localStorage['auth'],
                    Accept: 'application/json'
                },
                responseType: 'json'
            });
        } catch(error){
            console.log("profile data loading error")
            console.log(error)
            alert("데이터 로딩에 실패했습니다.");
        }
    
        try{
            yield call(xhr.send, fixed_url+backPath, {
                method: 'PUT',
                headers: {
                    "Authorization": "Basic "+localStorage['auth'],
                    "Content-Type": 'application/json',
                    Accept: 'application/json',
                },
                responseType:'json',
                body: JSON.stringify({
                    "id": data.designid,
                    "name": data.designname,
                    "design": {
                        "body": data.design["body"],
                        "sleeve": data.design["sleeve"],
                        "banding": data.design["banding"],
                        "stripe": data.design["stripe"],
                        "button": data.design["button"],
                    },
                    "text": data.text,
                    "image": {
                        "frontImg": data.image["frontImg"],
                        "backImg": data.image["backImg"]
                    },
                    "logo": {
                        "front": data.logo["front"],
                        "back": data.logo["back"]
                    }
                })
            });
            console.log("save design succeed ");
            if(confirm("저장되었습니다.\n저장된 디자인을 확인하시겠습니까?") === true) 
                yield put(actions.changeUrl('group/'+profile_user_data.body['user_group']+'/'))
        }catch(error){
            console.log(error)
            alert("저장에 실패했습니다.");
            return;
        }
    }
    
}

function *postDesign(data) {
    console.log("postDesign designid: ", data.designid, " groupid: ", data.groupid)
    const backPath = 'groups/'+data.groupid+'/post/'+data.designid+'/';
    // let temp;
    try{
        yield call(xhr.get, fixed_url+backPath,{
            headers:{
                "Authorization": "Basic " + localStorage['auth'],
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            responseType: 'json',
        });
        console.log("post design succeed!");
        if(window.location.pathname === '/group/'+data.groupid+'/') {
            alert("게시되었습니다.")
            yield put(actions.changeUrl(window.location.pathname))
        }
        else {
            if(confirm("게시되었습니다.\n해당 그룹으로 이동하시겠습니까?") === true)
            yield put(actions.changeUrl('group/'+data.groupid+'/'));
        }
        
        // if(window.location.pathname === '/group/'+data.groupid+'/') {
        //     confirmAlert({
        //         title: "디자인 저장을 위해 로그인 또는 가입 하시겠습니까?",
        //         // message: '로그인 또는 가입 하시겠습니까?',
        //         buttons: [
        //             {
        //                 label: '로그인',
        //                 onClick: function* click() {yield put(actions.changeUrl('/main/'))}
        //             },
        //             {
        //                 label: '가입',
        //                 onClick: () => this.props.onClickJoin()
        //             },
        //             {
        //                 label: '아니오',
        //                 onClick: () => {return}
                        
        //             }
        //         ]
        //     });
        // }

    }catch(error){
        console.log(error)
        alert("디자인을 게시할 수 없습니다.");
        return ;
    }
}
