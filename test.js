const assert = require("assert");
const promisify = require("./index");

describe('promisify', function(){

    it('should pass args to func', ()=> {
        const d = promisify((...rest)=>{
            return Promise.resolve(rest);
        });

        return d(3, 2, 1).then(res => {
            assert.deepEqual( res, [3, 2, 1]);
        })
    })

    it('should resolve if func returns resolved promise', ()=> {
        const d = promisify(()=>Promise.resolve(123));

        return d().then(res => {
            assert.equal( res, 123);
        })
    })

    it('should reject if func returns rejected promise', ()=> {
        const d = promisify(()=>Promise.reject(123));

        return d()
        .then(res => {
            assert.fail("should return rejected Promise");
        })        
        .catch(res => {
            assert.equal( res, 123);
        })
    })

    it('should return Promise anyway (value -> resolved Promise)', ()=> {
        const d = promisify(()=>"abc");

        return d().then(res => {
            assert.equal( res, "abc");
        })
    })

    it('should return Promise anyway (undefined -> resolved Promise)', ()=> {
        const d = promisify(()=>{return undefined});

        return d().then(res => {
            assert.equal( res, undefined);
        })
    })

    it('should return Promise anyway (null -> resolved Promise)', ()=> {
        const d = promisify(()=>{return null});

        return d().then(res => {
            assert.equal( res, null);
        })
    })

    it('should return Promise anyway (Error -> rejected Promise)', ()=> {
        const d = promisify(()=>{
            throw new Error("err");
        });

        return d()
        .then(res => {
            assert.fail("should return rejected Promise");
        })        
        .catch(err => {
            assert.ok( err instanceof Error, "err should be instance of Error");
            assert.equal( err, "Error: err");
        })
    })   
    
});