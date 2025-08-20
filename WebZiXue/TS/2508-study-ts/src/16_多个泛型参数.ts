function identity<T, U>(value: T, message: U): T {
  return value;
}

identity<number, string>(18, 'zhangs');


function func100<T, R>(arr: [T, R]): [R, T] {
  return [arr[1], arr[0]]
}

func100(['str', 10])
func100([100, 'string'])
func100<boolean, null>([true, null])