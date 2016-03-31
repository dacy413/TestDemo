var PENDDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

function getThen(result){
  if (result && (typeof result === "object") || (typeof result === "function")){
    var then = result.then;
    if (typeof then === "function"){
      return then;
    }
  }
  return null;
}

function doResolve(fn,onFulfiled,onRejected){
  var done = false;
  try {
    fn(function (value){
      if (done) return;
      done = true;
      onFulfiled(value);
    },
    function (reason){
      if (done) return;
      done = true;
      onRejected(reason);
    })
  } catch (ex){
    if (done) return;
    done = true;
    onRejected(ex);
  }
}


function Promise(){
  var state = PENDDING;
  var value = null;
  var handlers = [];

  function fulfilled(result){
    state = FULFILLED;
    value = result;
  }

  function reject(error){
    state = REJECTED;
    value = error;
  }

  function resolve(result){
    try {
      var then = getThen(result);
      if(then){
        doResolve(then.bind(result),resolve,reject);
        return;
      }
      state = FULFILLED;
      value = result;
    } catch (e) {
      reject(e);
    }
  }

  function reject(error) {
    state = REJECTED;
    value = error;
  }
  doResolve(fn,resolve,reject);
}
