// jest testing
//import React from 'react';
//import ReactDOM from 'react-dom';
//import {create} from 'react-test-renderer';
//import {mount, shallow} from 'enzyme';
//import Adapter from 'enzyme-adapter-react-16';
//import DesignPage from '../components/DesignPage/DesignPage'
//import FabricCanvas from '../components/DesignPage/FabricCanvas'
//import TemplateList from '../components/DesignPage/TemplateList';
//import TemplateListItem from '../components/DesignPage/TemplateListItem';
import * as actions from '../actions';
import homepageApp from './index.js';

//configure({adapter: new Adapter()});

/*describe('FabricCanvas', ()=> {
    it ('renders without crashing', ()=> {
        //const component = create(<FabricCanvas/>);
        //const instance = component.getInstance();
        //await instance.componentDidMount();

         //const div = document.createElement('div');
         //ReactDOM.render(<FabricCanvas/>, div);
         //ReactDOM.unmountComponentAtNode(div);

         const wrapper = shallow(<FabricCanvas/>);
         expect(wrapper.length).toBe(1);
    })
})*/

/*describe('DesignPage', ()=> {
    it('renders without crashing', ()=>{
        //const component = create(<DesignPage/>);
        //const instance = component.getInstance();
        //await instance.componentDidMount();

        //const div = document.createElement('div');
        //ReactDOM.render(<Clock/>, div);

        //mount(<DesignPage/>);
        //shallow(<DesignPage />);
    })
})*/

const initState = {
    authorization: "",
    profile_id_pw: null,
    profile_user: null,

    all_groups: [],
    my_groups: [],
    filtered_groups: [],
    
    now_group: null,
    group_users: [], 
    group_designs: [], 
    
    now_design: {},
    my_designs: [],

    load: 0,
    loading: false,   
}


describe('homepage reducer', () => {
    it('should return the initial state', () => {
        expect(homepageApp(undefined, {})).toEqual(initState)
    })
    it('should fill authorization', () => {
        const auth = 'test:testpasswd'
        expect(homepageApp(undefined, actions.authenticate(window.btoa(auth)))).toEqual({
            authorization: auth,
            profile_id_pw: null,
            profile_user: null,

            all_groups: [],
            my_groups: [],
            filtered_groups: [],
            
            now_group: null,
            group_users: [], 
            group_designs: [], 
            
            now_design: {},
            my_designs: [],

            load: 0,
            loading: false,      
            })
    })
    it('should return the signout state', () => {
        expect(homepageApp(undefined, actions.signOut())).toEqual(initState)
    })
    it('should return the changed state', () => {
        const auth = 'test:testpasswd'

        const state = {
            authorization: auth,
            profile_id_pw: null,
            profile_user: null,

            all_groups: [],
            my_groups: [],
            filtered_groups: [],
            
            now_group: null,
            group_users: [], 
            group_designs: [], 
            
            now_design: {},
            my_designs: [],

            load: 0,
            loading: false,   
        }

        expect(homepageApp(undefined, actions.setState(state))).toEqual(state)
    })

})
