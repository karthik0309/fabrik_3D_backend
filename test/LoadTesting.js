import http from 'k6/http'

export let options={
    insecureSkipTLSVerify: true,
    noConnectionReuse: true,
    stages: [
        { duration: '2m', target: 100 }, 
        { duration: '5m', target: 100 }, 
        { duration: '2m', target: 200 }, 
        { duration: '5m', target: 200 }, 
        { duration: '2m', target: 300 }, 
        { duration: '5m', target: 300 }, 
        { duration: '2m', target: 500 }, 
        { duration: '5m', target: 400 }, 
        { duration: '10m', target: 0 }, 
      ],
}

export default ()=>{
    http.get('http://localhost:8000/get')
}