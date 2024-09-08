import { useEffect, useState, useRef } from 'react';
import './style.css'
import api from '../../services/api.js';

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputEmail = useRef()
  const inputAge = useRef()

  // LIST USERS
  async function getUsers() {
    const usersFromAPI = await api.get('/users')

    setUsers(usersFromAPI.data)
  }

  // CREATE USERS
  async function createUSer() {
    await api.post('/createUser', {
      name: inputName.current.value,
      email: inputEmail.current.value,
      age: inputAge.current.value
    })

    // RELOAD THE PAGE
    await getUsers()

    // CLEAR INPUTS
    clearInputs()
  }

  // DELETE USERS
  async function deleteUser(id) {
    await api.delete(`/deleteUser/${id}`)

    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  // CLEAR INPUT FIELDS
  function clearInputs() {
    inputName.current.value = ''
    inputEmail.current.value = ''
    inputAge.current.value = ''
  }


  return (
    <div className='container'>
      <form className='form'>
        <h1>Cadastro de Usuários</h1>

        <input type="text" name="name" placeholder='Nome Completo' ref={inputName} />
        <input type="email" name="email" placeholder='E-mail' ref={inputEmail} />
        <input type="number" name="age" placeholder='Idade' ref={inputAge} />

        <button type='button' onClick={createUSer}>Cadastrar</button>
      </form>

      {users.map(user => {
        return (
          <div className='container-register' key={user.id}>
            <div className='registers'>
              <p> <span>Nome:</span> {user.name}</p>
              <p> <span>Email:</span> {user.email}</p>
              <p> <span>Idade:</span> {user.age} ano(s)</p>
            </div>

            <div className='trash'>
              <button onClick={() => deleteUser(user.id)}>
                <box-icon name='trash'></box-icon>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home