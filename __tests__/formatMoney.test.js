import formatMoney from '../lib/formatMoney';
describe('formatMoney',()=>{
    it('works with fractions', ()=>{
        expect(formatMoney(1)).toEqual('$0.01');
        expect(formatMoney(10)).toEqual('$0.10');
        expect(formatMoney(9)).toEqual('$0.09');
        expect(formatMoney(40)).toEqual('$0.40');
    });

    it('does\'t show cents on whole values', ()=>{
        expect(formatMoney(100)).toEqual('$1');
        expect(formatMoney(900)).toEqual('$9');
        expect(formatMoney(5000)).toEqual('$50');
        expect(formatMoney(1000000)).toEqual('$10,000');
    });

    it('shows cents on whole and frationañ values', ()=>{
        expect(formatMoney(1234)).toEqual('$12.34');
        expect(formatMoney(156)).toEqual('$1.56');
        expect(formatMoney(50020)).toEqual('$500.20');
        expect(formatMoney(1000005)).toEqual('$10,000.05');
    });
});