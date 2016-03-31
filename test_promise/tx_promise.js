function PromiseX(fun) {
  this.succArg = undefined;
  this.failArg = undefined;
  this.succCBs = [];
  this.failCBs = [];
  this._status = this.STATUS.PENDING;

  this._execFun(fun);
};

PromiseX.prototype.STATUS = {
  PENDING: 1,
  RESOLVE: 2,
  REJECT: 3
};

PromiseX.prototype._isFunction = function (f) {
  return Object.prototype.toString.call(f) === '[object Function]';
};

PromiseX.prototype._exec = function (callback, arg) {
  var newcallback;

  if (this._isFunction(callback)) {
    if (callback instanceof PromiseX) {
      callback.resolve(arg);
    } else {
      newcallback = new PromiseX(callback);
      newcallback.resolve(arg);
    }
  }
};

PromiseX.prototype._execFun = function(fun) {
  var that = this;
  if (this._isFunction(fun)) {
    console.log("_execFun ",fun);
    fun(function() {
      that.succArg = Array.prototype.slice.apply(arguments);
      that._status = that.STATUS.RESOLVE;

      that.resolve.apply(that,arguments);
    },function() {
      that.failArg = Array.prototype.slice.apply(arguments);
      that._status = that.STATUS.REJECT;

      that.reject.apply(that,arguments);
    });
  } else {
    console.log("resolve");
    this.resolve(fun);
  }
}

PromiseX.prototype.resolve = function () {
  var arg = arguments,ret,callback = this.succCBs.shift();

  if (this._status === this.STATUS.RESOLVE && callback) {
    ret = callback.apply(callback,arg);
    if (!(ret instanceof PromiseX)) {
      var _ret = ret;
      ret = new PromiseX(function(resolve) {
        setTimeout(function() {
          resolve(_ret);
        });
      });
      ret.succCBs = this.succCBs.slice();
    }
  }
};

PromiseX.prototype.reject = function () {
  var arg = arguments,ret,callback = this.failCBs.shift();
  if (this._status === this.STATUS.REJECT && callback) {
    ret = callback.apply(callback,arg);
    if (!(ret instanceof PromiseX)) {
      var _ret = ret;
      ret = new PromiseX(function(resolve) {
        setTimeout(function() {
          resolve(_ret);
        },200);
      });
      ret.failCBs = this.failCBs.slice();
    }
  }
};

PromiseX.prototype.then = function (s,f) {
    // console.log("s ",s," f ",f);
    this.done(s);
    this.fail(f);
    return this;
};

PromiseX.prototype.done = function(fun) {
  if (this._isFunction(fun)) {
    if (this._status === this.STATUS.RESOLVE) {
      fun.apply(fun,this.succArg);
    } else {
      this.succCBs.push(fun);
    }
  }
  return this;
};

PromiseX.prototype.fail = function(fun) {
  // console.log("fun ",fun);
  if (this._isFunction(fun)) {
    if (this._status === this.STATUS.REJECT) {
      fun.apply(fun,this.failArg);
    } else {
      this.failCBs.push(fun);
    }
  }
  return this;
};

PromiseX.prototype.always = function(fun) {
  this.done(fun);
  this.fail(fun);
  return this;
};

px = new PromiseX(function () {
  console.log("a");
  return 1;
})

px.then(function () {
  console.log("b");
},function () {
  console.log("c");
})

px.resolve();
