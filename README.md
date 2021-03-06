# MuState

MuState is an object wrapper which allows changing values deep in the object structure without mutating any of the intermediate object values. Every value change to the MuState creates a chain of new object references leading to the changed value.

This behavior is useful anytime object reference equality is used to determine if an object (or its children) has changed value (react-redux is a common case of this).

#### Example

The example below demonstrates changing a deeply nested value (a3), both with and without MuState.

```
    const MuState = require('mustate-js');

    let state = {
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
    
    // without MuState     
    state = { a: { ...state.a, a1: { ...state.a.a1, a2: { ...state.a.a1.a2, a3: 10 } } } };
    
    // with MuState
    let muState = new MuState(state);
    muState.a.a1.a2.a3 = 10;
```

#### Install

```
    npm install --save mustate-js
```

#### Requirements

MuState uses Javascript Proxies, which are not polyfill-able. Be sure that your target environment supports Proxies before using MuState.

[MDN - Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)