import { CREATE_GROUP, SEARCH_GROUP, JOIN_GROUP, TO_GROUP_DETAIL, TO_ADMIN_GROUP, LIKE_DESIGN, CHANGE_GROUP_INFO, DELETE_GROUP_USER, DELETE_GRUOP_DESIGN, SAVE_DESIGN, POST_DESIGN, WITHDRAW_GROUP, UNLIKE_DESIGN, DELETE_GROUP, GIVE_ADMIN, NEW_DESIGN, TO_EDIT_DESIGN, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, LIKE_COMMENT, UNLIKE_COMMENT, RESET_DESIGN, EDIT_DESIGN_NAME } from './types.js'

export const showNavBar = () => {
  return{
    type: 'NAV_BAR',
  }
}

// When the user inputs username, password and clicks the 'Sign In' button, this action is invoked and Saga requests GET to 'auth' in backend page.
export const signIn = (username, password) => {
    return {
        type: 'SIGN_IN',
        username,
        password
    }
}

export const SIGN_IN = 'SIGN_IN'

// When the user is authenticated and succeeds to sign in, this action is invoked by Saga and reducer stores the user's authorization to its state.
export const authenticate = (auth) => {
    return {
        type: 'AUTHENTICATE',
        auth
    }
}

// When the user enters username, password and pwdverification and clicks the '회원가입', this action is invocked and Saga requests POST to 'User List' in backend page.
export const postSignUp = (username, password) => {
console.log("%%%%");
    return {
        type: 'POST_SIGN_UP',
        username,
        password
    }
}

//When the user clicks the 'Sign Out' button, this action is invoked
export const signOut = () => {
    return {
       type: 'SIGN_OUT',
    }
}
export const SIGN_OUT = 'SIGN_OUT'


// Move to another page
export const changeUrl = (pathname) => {
    return {
        type: 'CHANGE_URL',
        path: pathname,
    }
}


export const setState = (state) => {
    return {
        type: 'SET_STATE',
        state: state
    }
}



export const gotoSignUpPage = () => {
    return {
        type: 'GOTO_SIGN_UP',
    }
}



export const toProfile = (profile_user) =>{
    return {
        type: 'TO_PROFILE',
        profuser: profile_user,
    }
}
export const toChangeIntro = (user,name,belong,intro, removeImg, changeImg, img)=>{
    return {
         type: 'TO_INTRO_CHANGE',
         user: user,
         myname: name,
         mybelong: belong,
         myintro: intro,
         removeImg: removeImg,
         changeImg: changeImg,
         img: img
    }
}
export const toChangePW = (profile_user, oldpw, newpw) => {
    return {
        type: 'TO_PW_CHANGE',
        profuser: profile_user,
        oldpw : oldpw,
        newpw : newpw,
    }
}
export const toEscape = (profile_user) => {
    return {
        type: 'TO_ESCAPE',
        profuser: profile_user,
    }
}

//GroupPage Actions
export const toCreateGroup = (grouptype, groupname) => {
	return {
		type: CREATE_GROUP,
		grouptype: grouptype,
		groupname: groupname,
	}
}

export const toSearchGroup = (newList) => {
	return {
		type: SEARCH_GROUP,
		newList: newList,
	}
}

export const toJoinGroup = (groupid) => {
    console.log("joinGroup action")
    console.log(groupid)
	return {
		type: JOIN_GROUP,
		groupid: groupid,
    }
}

export const toWithdrawGroup = (groupid) => {
    console.log("withdrawGroup action ", groupid)
    return {
        type: WITHDRAW_GROUP,
        groupid: groupid,
    }
}

export const gotoGroupDetail = (groupid) => {
    console.log("gotoGroupDetail action")
    console.log(groupid)
	return {
		type: TO_GROUP_DETAIL,
		groupid: groupid,
	}
}

export const gotoAdminGroup = (groupid) => {
    console.log("adminGroup action")
    console.log(groupid)
    return {
        type: TO_ADMIN_GROUP,
        groupid: groupid,
    }
}



export const toEditDesignName = (designid, name) => {
    console.log("toEditDesignName action")
    console.log(designid)
    return {
        type: EDIT_DESIGN_NAME,
        designid: designid,
        name: name,
    }
}

export const gotoEditDesign = (designid) => {
    console.log("gotoEditDesign action")
    console.log(designid)
    return {
        type: TO_EDIT_DESIGN,
        designid: designid,
    }
}

export const toLikeDesign = (designid) => {
    console.log("likeDesign action")
    console.log(designid)
    return {
        type: LIKE_DESIGN,
        designid: designid,
    }
}

export const toUnlikeDesign = (designid) => {
    console.log("unllikeDesign action: ", designid)
    return {
        type: UNLIKE_DESIGN,
        designid: designid,
    }
}



export const toAddComment = (designid, name, message) => {
    console.log("addComment action: ", designid, name, message)
    return {
        type: ADD_COMMENT,
        designid: designid,
        name: name,
        message: message,
    }
}

export const toEditComment = (designid, commentid, name, message) => {
    console.log("editComment action: ", designid, commentid, name, message)
    return {
        type: EDIT_COMMENT,
        designid: designid,
        commentid: commentid,
        name: name,
        message: message,
    }
}

export const toDeleteComment = (designid, commentid) => {
    console.log("deleteComment action: ", designid, commentid)
    return {
        type: DELETE_COMMENT,
        designid: designid,
        commentid: commentid,
    }
}

export const toLikeComment = (commentid) => {
    console.log("likeComment action: ", commentid)
    return {
        type: LIKE_COMMENT,
        commentid: commentid,
    }
}

export const toUnlikeComment = (commentid) => {
    console.log("unlikeComment action: ", commentid)
    return {
        type: UNLIKE_COMMENT,
        commentid: commentid,
    }
}



export const toChangeGroupInfo = (groupid, grouptype, groupname) => {
    console.log("changeGroupInfo action")
    console.log(grouptype, groupname)
    return {
        type: CHANGE_GROUP_INFO,
        groupid: groupid,
        grouptype: grouptype,
        groupname: groupname,
    }
}

export const toDeleteGroupUser = (groupid, userid) => {
    console.log("deleteGroupUser action")
    console.log(userid)
    return {
        type: DELETE_GROUP_USER,
        groupid: groupid, 
        userid: userid,
    }
}

export const toDeleteGroupDesign = (groupid, designid) => {
    console.log("deleteGroupDesign action")
    console.log(designid)
    return {
        type: DELETE_GRUOP_DESIGN,
        groupid: groupid,
        designid: designid,
    }
}

export const toDeleteGroup = (groupid) => {
    console.log("deleteGroup action: ", groupid)
    return {
        type: DELETE_GROUP,
        groupid: groupid,
    }
}

export const toGiveAdmin = (groupid, userid) => {
    console.log("giveAdmin action groupid: ", groupid, " userid: ", userid)
    return {
        type: GIVE_ADMIN,
        groupid: groupid,
        userid: userid,
    }
}



export const toResetDesign = () => {
    console.log("resetDesign action")
    return {
        type: RESET_DESIGN
    }
}

export const toNewDesign = () => {
    console.log("newDesign action")
    return {
        type: NEW_DESIGN
    }
}

export const toSaveDesign = (designid, designname, design, text, image, logo) => {
    console.log("saveDesign action", designid, designname, design, text, image, logo)
    return {
        type: SAVE_DESIGN,
        designid: designid, 
        designname: designname,
        design: design,
        text: text,
        image: image,
        logo: logo,
    }
}

export const toPostDesign = (designid, groupid) => {
    console.log("postDesign action, designid: ", designid, " groupid: ", groupid)
    return {
        type: POST_DESIGN,
        designid: designid,
        groupid: groupid,
    }
}
