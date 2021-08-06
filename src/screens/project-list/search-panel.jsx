import {useState} from 'react'

export const SearchPanel = () => {
    const [param, setParam] = useState({
        name: '',
        id: ''
    });
    return <form>
        <input type="text" value={param.name} onChange={(evt)=>setParam({
            ...param,
            name: evt.target.value
        })}/>
    </form>
}
