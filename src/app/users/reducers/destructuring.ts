const obj = {
  email: '',
  password: '',
  age: 0
}

const { password, age } = obj;

const items = [1, 2, 3, 4, 5]

const [first] = items;
const [_first, second] = items;
const [__first, , _second] = items;
const [___first, ...others] = items;

interface person {
  email: string
  password: string
  age: number
}

function foo({ email }: person) {
  console.log(email)
}
