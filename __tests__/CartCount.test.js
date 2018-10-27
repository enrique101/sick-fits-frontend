import CartCount from "../components/CartCount";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

const count = 23;

describe("<CartCount/>", () => {
  it("renders", () => {
    shallow(<CartCount count={count} />);
  });

  it("renders and matches the snapshot", () => {
    const wrapper = shallow(<CartCount count={count} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("updates via props", () => {
    const wrapper = shallow(<CartCount count={count} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.setProps({ count: count + 10 });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
