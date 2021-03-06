
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
export const AUTHENTICATE = 'AUTHENTICATE'

// When the user enters username, password and pwdverification and clicks the '회원가입', this action is invocked and Saga requests POST to 'User List' in backend page.
export const postSignUp = (username, password) => {
    return {
        type: 'POST_SIGN_UP',
        username,
        password,
    }
}

export const POST_SIGN_UP = 'POST_SIGN_UP'

//When the user clicks the 'Sign Out' button, this action is invoked
export const signOut = () => {
    return {
       type: 'SIGN_OUT',
    }
}

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

export const gotoGroupDetail = (groupid) => {
    console.log("gotoGroupDetail action")
    console.log(groupid)
	return {
		type: 'TO_GROUP_DETAIL',
		groupid: groupid,
	}
}

/*export const gotoEditDesign = (designid) => {
    console.log("gotoEditDesign action")
    console.log(designid)
    return {
        type: 'TO_EDIT_DESIGN',
        designid: designid,
    }
}*/

export const toSaveDesign = (value) => {
    return {
        type: 'SAVE_DESIGN',
        value: value,
    }
}

export const SAVE_DESIGN = 'SAVE_DESIGN'

// export const toResetDesign = () => {
//     return {
//         type: 'RESET_DESIGN'
//     }
// }

// export const RESET_DESIGN = 'RESET_DESIGN'

// export const toPostDesign = (designid, groupid) => {
//     return {
//         type: 'POST_DESIGN',
//         designid: designid,
//         groupid: groupid,
//     }
// }

// export const POST_DESIGN = 'POST_DESIGN'
