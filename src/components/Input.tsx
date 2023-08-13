
type InputProps = {
    props:any | {onchange:(...args:any)=>any}
    placeholder:string
    value?:string
}
export default function MyInput({props,placeholder,value=''}:InputProps) {
    return (<>
        <input onChange={e=>props.onchange(e.target.value)} value={value} placeholder={placeholder} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    </>);
}