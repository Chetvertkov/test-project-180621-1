export function LogsTable(props){

    let logsJSX = props.logs.map((log)=>{
        return <tr key={log._id}>
            <td>{log.timestamp}</td>
            <td>{JSON.stringify(log.input_data)}</td>
            <td>{log.output_data}</td>
        </tr>
    })

    return <table className='table table-hover'>
        <thead>
        <tr>
            <th>Timestamp</th>
            <th>input_data</th>
            <th>output_data</th>
        </tr>
        </thead>
        <tbody>
        {logsJSX}
        </tbody>
    </table>
}