import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils';
import CreateItem, { CREATE_ITEM_MUTATION } from '../components/CreateItem';
import {fakeItem} from '../lib/testUtils';
import { addDaysWithOptions } from 'date-fns/fp';

// mocks global fetch
const dummyImage = 'https://dummy/image.jpg';
global.fetch = jest.fn().mockResolvedValue({
    json: ()=>({
        secure_url: dummyImage,
        eager:[{
            secure_url: dummyImage
        }]
    })
});

describe('<CreateItem />', ()=>{
    it('renders and matches snapshot', async()=>{
        const wrapper = mount(
            <MockedProvider>
                <CreateItem />
            </MockedProvider>
        );
        const form = wrapper.find('form[data-test="form"]');
        expect(toJSON(form)).toMatchSnapshot();
    });

    it('uploads a file on changed', async()=>{
        const wrapper = mount(
            <MockedProvider>
                <CreateItem />
            </MockedProvider>
        );
        const input = wrapper.find('#file');
        input.simulate('change',{ target:{ files: ['fakedog.jpg']}});
        await wait();
        const component = wrapper.find('CreateItem').instance();
        expect(component.state.image).toEqual(dummyImage);
        expect(component.state.largeImage).toEqual(dummyImage);
        expect(global.fetch).toHaveBeenCalled();
        global.fetch.mockReset();
    });

    it('updates state on change', async()=>{
        const wrapper = mount(
            <MockedProvider>
                <CreateItem />
            </MockedProvider>
        );
        wrapper.find('#title').simulate('change',{ target:{ value: 'New Title', name:'title'}});
        wrapper.find('#description').simulate('change',{ target:{ value: 'New Description', name:'description'}});
        wrapper.find('#price').simulate('change',{ target:{ value: 5000, name:'price', type:'number'}});
        await wait();
        expect(wrapper.find('CreateItem').instance().state).toMatchObject({
            title: 'New Title',
            description: 'New Description',
            price: 5000
        });
    });

    it('creates an item when the form is submitted', async()=>{
        const fitem = fakeItem();
        const mocks = [{
            request:{
                query: CREATE_ITEM_MUTATION,
                variables: {
                    title: fitem.title,
                    description: fitem.description,
                    price: fitem.price,
                    image: '',
                    largeImage: ''
                }
            },
            result:{
                data:{
                    createItem: {
                        ...fakeItem,
                        __typename: 'Item',
                        id:'123'
                    }
                }
            }
        }];
        const wrapper = mount(
            <MockedProvider mocks={ mocks }>
                <CreateItem />
            </MockedProvider>
        );

        wrapper.find('#title').simulate('change',{ target:{ value: fitem.title  , name:'title'}});
        wrapper.find('#description').simulate('change',{ target:{ value: fitem.description, name:'description'}});
        wrapper.find('#price').simulate('change',{ target:{ value: fitem.price, name:'price', type:'number'}});
        Router.router = {
            push: jest.fn()
        };
        
        wrapper.find('form[data-test="form"]').simulate('submit');
        await wait(50);
        expect(Router.router.push).toHaveBeenCalled();
        expect(Router.router.push).toHaveBeenCalledWith({"pathname": "/item", "query": {"id": "123"}});
    });
});