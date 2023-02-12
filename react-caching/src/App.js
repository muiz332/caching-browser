import './App.css';
import { useState,useEffect, useRef } from 'react';

function App() {

  const [notif,setNotif] = useState([]);

  useEffect(function(){
    setInterval(async function(){
      const etag = JSON.parse(localStorage.getItem('notif'))?.etag
      try{
  
        if(etag){
          const res = await fetch("http://127.0.0.1:8080/api/notif",{
            headers : {
              "if-none-match" : etag
            }
          })
  
  
          if(res.status === 200){
            const resNotif = await res.json();
            setNotif(resNotif.data)
            localStorage.setItem("notif",JSON.stringify(resNotif))
          }else if(res.status === 204){
            const cacheNotif = JSON.parse(localStorage.getItem("notif"));
            setNotif(cacheNotif.data)
          }
  
  
        }else{
          const data = await (await fetch("http://127.0.0.1:8080/api/notif",{
            headers : {
              "if-none-match" : etag
            }
          })).json()
          localStorage.setItem("notif",JSON.stringify(data))
        }
  
  
  
      }catch(err){
        console.log(err)
      }
    },2000)
  },[])

  return <>
    <nav className='flex border p-5 justify-between'>
      <h1 className='text-xl font-bold'>Caching</h1>
      <ul className='border flex w-1/4 justify-around'>
        <li>Beranda</li>
        <li className='notif cursor-pointer'>
          <p className='inline-block'>Notif</p>
          <i className="fa-regular fa-bell ml-2"></i>
          </li>
      </ul>
    </nav>

    <ul>
      {notif.map((n,i) => (

        <li key={i}>{n.judul}</li>

      ))}
    </ul>

    </>
}

export default App;
