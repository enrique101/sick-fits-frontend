import { shallow } from 'enzyme';
import ItemComponent from '../components/Item';

const fakeItem = {
  id: 'ABCDEFG',
  title: 'Item Title',
  price: 1000,
  description: 'A Test description',
  image:'testimg.jpg',
  largeImage : 'largetestimage.jpg',

};
describe('<Item/>', ()=> {
    it('renders and displays okay',() =>{
        const wrapper = shallow(<ItemComponent item={ fakeItem }/>);
    });
});