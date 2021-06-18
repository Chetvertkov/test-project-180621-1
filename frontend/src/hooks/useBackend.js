// const backendEndPoint = 'http://localhost:5000';
const backendEndPoint = 'http://81.163.31.205:5000';
console.log('backendEndPoint', backendEndPoint)
const useBackend = ()=>{

    return async (path,method,payload)=>{

        let requestOptions = {
            method: method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if(method==='POST'){
            requestOptions.body = JSON.stringify(payload)
        }
        if(method==='GET'){
            if(payload!==undefined){
                path+="?"
                Object.keys(payload).forEach((key)=>{
                    path+=key+'='+[payload[key]]+'&'
                })
                console.log(path)
            }
        }

        const response = await fetch(backendEndPoint+path, requestOptions);
        return await response.json()
    }
};

export default useBackend;
