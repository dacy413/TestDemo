def a(func):
    def _dec():
        print("a")  
        func()
        print("a...")
    return _dec

def b(func):
    def _dec():
        print("b")
        func()
        print("b...")
    return _dec


@a
@b
def func():
    print("func...")
func()
