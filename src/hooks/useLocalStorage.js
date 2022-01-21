const { useState, useEffect } = require("react");

export default function useLocalStorage(key, defaultValue){
    const [value,setValue] = useState(()=>{
        const jsonValue = localStorage.getItem(key)
        if(jsonValue != null) return JSON.parse(jsonValue)

        if(defaultValue === 'function'){
            return defaultValue()
        }else {
            return defaultValue
        }
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    },[key,value])

    return [value, setValue]
}