import React, { useState } from 'react'

const Register = () => {

    const [form, setForm] = useState({ name:"", age:"", gender:"", contact_number:"", address:"" });
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3000/pat/patients", form);
        alert("Patient Registered");
      };
    

  return (
    <div>
        <div className="card">
            <h3>Register Patient</h3>
            <form className="form" >
              <input type="text" placeholder="Full Name" name='name' onChange={(e)=>setForm({...form, name:e.target.value})} />
              <input type="email" placeholder="Email" name='email' onChange={(e)=>setForm({...form, name:e.target.value})}/>
              <select name='gender' onChange={(e)=>setForm({...form, name:e.target.value})}>
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
             { /*<input type="date" /> */}
               <input type="number" placeholder="Age"  name='age' onChange={(e)=>setForm({...form, name:e.target.value})}/>
              <input type="number" placeholder="Phone" name='contact_number' onChange={(e)=>setForm({...form, name:e.target.value})}/>
              <textarea placeholder="Address" name='address' onChange={(e)=>setForm({...form, name:e.target.value})}></textarea>
              <input type="date" placeholder='Registered date' name='registered_date' onChange={(e)=>setForm({...form, name:e.target.value})}/>
              <button type="submit" onSubmit={handleSubmit}>Register</button>
            </form>
          </div>
    </div>
  )
}

export default Register