import {useDispatch, useSelector} from "react-redux";
import {Input} from "./Input";
import {InputSelect} from "./InputSelect";
import {useEffect, useState} from "react";
import useBackend from "../hooks/useBackend";
import {setResponse} from "../redux/actions/response";

export function FormBuilder(props){

    let appConfig = useSelector(state=>state.configuration)
    let backend = useBackend()
    let dispatch = useDispatch()

    console.log('[form builder] app config',appConfig)

    const inputs = appConfig.parameters.input

    let [values,setValues] = useState({})

    useEffect(()=>{
        console.log('component did mount')
        let newVals = {}
        inputs.forEach((inp)=>{
            newVals[inp.name] = ''
        })
        setValues(newVals)
    },[])

    console.log('[form builder] values',values)

    let [btnDisabled,setBtnDisabled] = useState(false)

    const checkBtnDisabled=()=>{
        console.log('check btn status')
        let errorFlag=false
        inputs.forEach((inp)=>{
            if(values[inp.name]!==undefined){
                if(inp.type==='number'){
                    if(typeof values[inp.name]!=='number'){
                        errorFlag = true;
                    }
                }
                if(inp.type==='select'){
                    if(values[inp.name]===''){
                        errorFlag = true
                    }
                }
            }else{
                errorFlag = true;
            }
        })
        setBtnDisabled(errorFlag)
    }

    useEffect(()=>{
        console.log('btn effect ')
        checkBtnDisabled()
    },[values])

    let inputsJSX = inputs.map((inp)=>{
        switch (inp.type){
            case 'number':
                return <Input
                    key={inp.name}
                    type='number'
                    label={inp.title}
                    className='mb-2'
                    value={values[inp.name]}
                    onChange={(newValue)=>{
                        console.log('on change')
                        let obj = {}
                        Object.assign(obj,values)
                        obj[inp.name] = Number(newValue)
                        console.log(typeof obj[inp.name])
                        if(typeof obj[inp.name]==='number'){
                            console.log(obj)
                            setValues(obj)
                            // checkBtnDisabled()
                            console.log(values)
                        }

                    }}
                />
            case 'select':
                return <InputSelect
                    key={inp.name}
                    label={inp.title}
                    options={inp.items}
                    className='mb-2'
                    value={values[inp.name]}
                    onChange={(newValue)=>{
                        let obj = {}
                        Object.assign(obj,values)
                        obj[inp.name] = newValue
                        setValues(obj)
                        // checkBtnDisabled()
                        console.log(values)
                    }}/>
            default:
                return 'Неподдерживаемый формат поля'
        }

    })

    console.log('btn status',btnDisabled)

    return <>
        {inputsJSX}
        <div className='mt-2'>
            <button className='btn btn-primary' disabled={btnDisabled}
                onClick={async ()=>{
                    let response = await backend('/run','POST',values)
                    console.log(response)
                    dispatch(setResponse(response.scriptData))
                    setValues({})
                    checkBtnDisabled()
                }}
            >
                Запустить
            </button>
        </div>
    </>
}