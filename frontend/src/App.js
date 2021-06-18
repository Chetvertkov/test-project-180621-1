import useBackend from "./hooks/useBackend";
import {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {setConfiguration} from "./redux/actions/configuration";
import {FormBuilder} from "./components/FormBuilder";
import {LogsTable} from "./components/LogsTable";

function App() {
  const backend = useBackend()
  let [appStatus,setAppStatus] = useState(false)
  let appConfig = useSelector(state=>state.configuration)
  console.log('app config state',appConfig)

  let serverResponse = useSelector(state=>state.response)
  console.log('server response',serverResponse)

  let dispatch = useDispatch()

  useEffect( ()=>{
    const getDataFromBackend = async ()=>{
      let response = await backend('/config','GET')
      console.log(response)
      dispatch(setConfiguration(response))
      setAppStatus(true)

    }
    getDataFromBackend()
  },[])

  let [logs,setLogs]= useState([])
  const getLogsFromBackend = async ()=>{
    let response = await backend('/logs','GET')
    console.log('LOGS',response)
    setLogs(response.logs)
  }
  
  useEffect(()=>{
    getLogsFromBackend()
  },[serverResponse])

  if(appStatus){
    return (
        <div className='container'>
          <h1>{appConfig.title}</h1>
          <small><h3>{appConfig.description}</h3></small>

          <div className='row mt-4'>
            <div className='col'>
              <h4>Форма</h4>
              <FormBuilder/>
            </div>
            <div className='col'>
              <h4>Ответ от сервера</h4>
              {serverResponse}
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col'>
              <h4>История запросов</h4>
              <LogsTable logs={logs}/>
            </div>

          </div>
        </div>
    );
  }else {
    return <div>
      App is loading...
    </div>
  }

}

export default App;
