import { v4 as uuidv4 } from 'uuid';
let classNames = require('classnames')

export function Input(props){
    const elementId = uuidv4();
    let mainCLassNames = classNames('form',props.className);
    let value = props.value
    console.log('input value',props.value)
    if(value===undefined){
        value=''
    }

    return(<>
        <div className={mainCLassNames}>
            <label htmlFor={elementId}>{props.label}</label>
            <input type={props.type?props.type:'text'}
                   className="form-control"
                   id={elementId}
                   value={value}
                   onChange={
                       (e) => {
                           if(props.onChange!==undefined){
                               props.onChange(e.target.value);
                           }else{
                               console.log('onChange event is undefined')
                           }
                       }
                   }
                   placeholder={props.placeholder}/>

        </div>
    </>)
}
