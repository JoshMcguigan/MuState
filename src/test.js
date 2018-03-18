const MuState = require('./MuState');

describe('MuState', ()=>{

    let initialState, muState;

    beforeEach(()=>{
        initialState = {
            a: {
                a1: {
                    a2: {
                        a3: 3,
                        a4: 4
                    }
                }
            },
            b: {
                b1: 5,
                b2: 6
            },
            c: {
                c1: [1, 2, 3],
                c2: [{c3: 3}, {c4: 4}]
            }
        };

        muState = new MuState(initialState);
    });

    it('should return the same object if values have not changed', ()=>{
        const ref1 = muState.b;
        const ref2 = muState.b;

        const ref3 = muState.a.a1;
        const ref4 = muState.a.a1;

        expect(ref1).toBe(ref2);
        expect(ref3).toBe(ref4);
    });

    it('should return a new object if any descendant value has changed', ()=>{
        const ref1 = muState.b;
        muState.b.b1 = 10;
        const ref2 = muState.b;

        const ref3 = muState.a;
        muState.a.a1.a2.a3 = 10;
        const ref4 = muState.a;

        expect(ref1).not.toBe(ref2);
        expect(ref3).not.toBe(ref4);
    });

    it('should support setting values', ()=>{
        const ref1 = muState.b;
        muState.b.b1 = 10;
        const ref2 = muState.b;

        expect(muState.b.b1).toBe(10);
    });

    it('should support arrays in the chain of objects', ()=>{
        const ref1 = muState.c;
        muState.c.c2[0].c3 = 4;
        const ref2 = muState.c;

        expect(ref1).not.toBe(ref2);
        expect(muState.c.c2[0].c3).toBe(4);
    });

    it('should support adding to an array using the push method', ()=>{
        const ref1 = muState.c.c1;
        muState.c.c1.push(4);
        const ref2 = muState.c.c1;

        expect(ref1).not.toBe(ref2);
        expect(muState.c.c1).toEqual([1,2,3,4]);
    });

    it('should support removing array items with the pop method', ()=>{
        const ref1 = muState.c.c1;
        const poppedValue = muState.c.c1.pop();
        const ref2 = muState.c.c1;

        expect(ref1).not.toBe(ref2);
        expect(poppedValue).toBe(3);
        expect(muState.c.c1).toEqual([1,2]);
    })
});