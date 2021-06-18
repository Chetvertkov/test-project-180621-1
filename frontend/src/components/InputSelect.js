import { v4 as uuidv4 } from 'uuid';
let classNames = require('classnames')

export function InputSelect(props){
    const elementId = uuidv4();
    let mainCLassNames = classNames('form',props.className);

    let optionsJSX = <></>
    if(props.options){
        optionsJSX = props.options.map((option)=>{
            return <option value={option.value} key={option.value}>{option.title}</option>
        })
    }

    let value = props.value
    if(value===undefined){
        value=''
    }
    return(<>
        <div className={mainCLassNames}>
            <label htmlFor={elementId}>{props.label}</label>
            <select className="form-control"
                   id={elementId}
                   value={value}
                   onChange={
                       (e) => {
                           if(props.onChange!==undefined){
                               console.log(e.target.value)
                               props.onChange(e.target.value);
                           }else{
                               console.log('onChange event is undefined')
                           }
                       }
                   }
                    placeholder={props.placeholder}>
                {optionsJSX}
            </select>

        </div>
    </>)
}
