import { ref, reactive, computed } from "vue";

reactive({name: 'zhangsan'})
computed(() => '')

/**
 * 泛型工具:
 *    能够从现有类型得到一个新类型
 */

interface IIPerson {
  name: string;
  age: number;
  address: string;
  city?: string;
}

/**
 * 1. Partial
 *    将一个类型中，所有属性都变成可选
 */
type IIPersonPartial = Partial<IIPerson>;

/**
 * 2. Required
 *    将一个类型中，所有属性都变成必须
 */
type IIPersonRequired = Required<IIPerson>;

/**
 * 3. Omit
 *    将一个类型中，某些属性给移除得到一个新类型
 */
type IIPersonOmit = Omit<IIPerson, "city" | "address">;

/**
 * 4. Pick
 *    选择一个类型中一些属性组成一个新类型
 */
type IIPersonPick = Pick<IIPerson, "name" | "city">;

/**
 * 5. Record<K, T>
 *    组装一个新类型，该类型的 key 要为 K 类型，该类型的 value 要为 T 类型
 */
type IIPersonRecode = Record<number, IIPerson>;
const b100: IIPersonRecode = {
  0: {
    name: "",
    age: 18,
    address: "",
  },
  1: {
    name: "",
    age: 20,
    address: "",
    city: "",
  },
};

/**
 * 6. ReturnType<T>
 *    获取 T 类型的返回值类型
 */
function function100() {
  return "";
}

/**
 * typeof 获取类型的，Ts中对其增强了功能，使用对函数使用会返回函数的具体类型，而不是一个 'function'
 */
type b300 = typeof function100;

type b200 = ReturnType<typeof function100>;

/**
 * Array<string>
 *
 * Promise<number>
 */
