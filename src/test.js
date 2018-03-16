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
            }
        };

        muState = new MuState(initialState);
    });

    it('should return the same object if values have not changed', ()=>{
        const ref1 = muState.b;
        const ref2 = muState.b;

        const ref3 = muState.a;
        const ref4 = muState.a;

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
});

state = {
    a: {
        a1: {
            a2: {
                a3: 3,
                a4: 4
            },
            b2: {
            }
        },
        b1: {
        }
    },
    b: {
    }
};

state = { a: { ...state.a, a1: { ...state.a.a1, a2: { ...state.a.a1.a2, a3: 10 } } } }