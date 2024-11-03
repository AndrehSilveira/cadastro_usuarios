import './style.css'
import { FaTrashAlt } from "react-icons/fa";
import api from '../../services/api';
import { useEffect, useState, useRef } from 'react';

function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers(){
    const usersFromApi = await api.get('/users')
    setUsers( usersFromApi.data.data)
  }

  async function createUser(){
    await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }

  

  useEffect(() => {
    getUsers()
  },[])

  return (
    <>
      <div className="container">
        <form>
          <h1>Cadastro de Usuários</h1>
          <input placeholder='Nome' type="text" name='nome' ref={inputName} />
          <input placeholder='Idade' type="number" name='idade' ref={inputAge} />
          <input placeholder='E-mail' type="email" name='email' ref={inputEmail} />
          <button type='button' onClick={createUser}>Cadastrar</button>
        </form>
        {users.map((user) => (
          <div key={user.id} className='card'>
            <div>
              <p>Nome:  <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            <button>
              <FaTrashAlt />
            </button>
          </div>
        ))}


      </div>
    </>
  )
}

export default Home
