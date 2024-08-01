import { useState } from "react"

const Register = ()=>
{
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    //to display response we use this state
    const [message, setMessage] = useState('')

    const handleRegister = async (event) =>{
        event.preventDefault();
        try{
            const response = await fetch('http://localhost:5050/api/register',{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({userName, email, password}),
            })
            if(!response.ok)
                {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! ${response.status}, meassge: ${errorText}`)
                }
            const data = await response.json();
           setMessage('register successful, now login')
        }catch (error){
           setMessage(`login error: ${error.message}`);
        }

    };


    return(
        <div onSubmit={handleRegister} className="container">
            <h1>register account</h1>
            <form className="lform">
                <input
                className="lInput"
                type="text"
                value={userName}
                placeholder="enter username" 
                onChange={(e)=>{setUserName(e.target.value)}}
                required
                />
                 <br/>
                


                <input
                className="lInput"
                type="text"
                value={email}
                placeholder="enter email" 
                onChange={(e)=>{setEmail(e.target.value)}}
                required
                />

              
                <br/>


               <input
               className="lInput"
                type="password"
                value={password}
                placeholder="enter password" 
                onChange={(e)=>{setPassword(e.target.value)}}
                required
                />
           
             <br/>
             <br/>
            <button type="submit" className="btn">register</button>
            {message && <p>{message}</p>}
            </form>
        </div>
    )
}

export default Register;