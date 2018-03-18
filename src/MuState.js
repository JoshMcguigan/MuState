class MuState {
    constructor(state, origin = state, lineage = []){
        const proxies = {};

        return new Proxy(state, {
            get(target, key, reciever){
                if (typeof target[key] === 'object'){

                    const value = Reflect.get(target, key, reciever);

                    // if this value has already been given out,
                    // and the value hasn't changed since it was last given out,
                    // return the previously given out value
                    if((key in proxies) && (proxies[key].value === value)) {
                        return proxies[key].proxy;
                    }

                    const proxy = new MuState(value, origin, [...lineage, key]);
                    proxies[key] = {proxy, value};
                    return proxy;

                }
                else
                    return Reflect.get(target, key, reciever);
            },
            set(target, key, value, reciever){
                // create new object (as copy of the existing object) for each object in the chain to the changed value
                let objectToModify = origin;
                for(let i=0; i<lineage.length; i++){
                    if( Array.isArray(objectToModify[lineage[i]]) ){
                        objectToModify[lineage[i]] = [...objectToModify[lineage[i]]];
                    } else {
                        objectToModify[lineage[i]] = {...objectToModify[lineage[i]]};
                    }
                    objectToModify = objectToModify[lineage[i]];
                }
                objectToModify[key] = value;
                return true;
            }
        })
    }
}

module.exports = MuState;