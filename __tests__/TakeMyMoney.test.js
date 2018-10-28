import { mount } from 'enzyme';
import wait from 'waait';
import NProgress from 'nprogress';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import TakeMyMoney, { CREATE_ORDER_MUTATION } from '../components/TakeMyMoney';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

Router.router = {push(){}};

const mocks = [{
    request:{query: CURRENT_USER_QUERY},
    result:{
        data: { me: {
            ...fakeUser(),
            cart: [fakeCartItem()]
        }}
    }
}];

describe('<TakeMyMoney />',()=>{
    it('renders and matches snpashot', async ()=>{
        const wrapper = mount(
        <MockedProvider mocks={mocks}>
            <TakeMyMoney />
        </MockedProvider>
        );
        await wait();
        wrapper.update();
        const ckout = wrapper.find('ReactStripeCheckout');
        expect(toJSON(ckout)).toMatchSnapshot();
    });

    it('creates an order token', async()=>{
        const createOrderMock = jest.fn().mockResolvedValue({
            data: { createOrder: {id: "abc123"}}
        });
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <TakeMyMoney />
            </MockedProvider>
        );
        const component = wrapper.find('TakeMyMoney').instance();
        component.onToken({id:'abc123'}, createOrderMock);
        expect(createOrderMock).toHaveBeenCalled();
        expect(createOrderMock).toHaveBeenCalledWith({variables: {token: 'abc123'}});
    });

    it('activates progress bar', async()=>{
        const createOrderMock = jest.fn().mockResolvedValue({
            data: { createOrder: {id: "abc123"}}
        });
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <TakeMyMoney />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        NProgress.start = jest.fn();
        const component = wrapper.find('TakeMyMoney').instance();
        component.onToken({id:'abc123'}, createOrderMock);
        expect(NProgress.start).toHaveBeenCalled();
    });
    it('redirects when order it created', async()=>{
        const createOrderMock = jest.fn().mockResolvedValue({
            data: { createOrder: {id: "abc123"}}
        });
        Router.router.push = jest.fn();
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <TakeMyMoney />
            </MockedProvider>
        );
        const component = wrapper.find('TakeMyMoney').instance();
        component.onToken({id:'abc123'}, createOrderMock);
        await wait();
        expect(Router.router.push).toHaveBeenCalled();
        expect(Router.router.push).toHaveBeenCalledWith({
               pathname: '/order',
               query:{
                id: 'abc123',
               },
             });
    });
});