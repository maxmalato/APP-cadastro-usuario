import { useEffect, useState, useRef } from 'react';
import './style.css'
import api from '../../services/api.js';

function Home() {
  const [users, setUsers] = useState([]);
  const [age, setAge] = useState(''); // Estado para armazenar o valor da idade

  const inputName = useRef();
  const inputEmail = useRef();
  const inputAge = useRef();

  // LIST USERS
  async function getUsers() {
    const usersFromAPI = await api.get('/users');
    setUsers(usersFromAPI.data);
  }

  // CREATE USERS
  async function createUSer() {
    await api.post('/createUser', {
      name: inputName.current.value,
      email: inputEmail.current.value,
      age: age
    });

    // RELOAD THE PAGE
    await getUsers();

    // CLEAR INPUTS
    clearInputs();
  }

  // DELETE USERS
  async function deleteUser(id) {
    await api.delete(`/deleteUser/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  // CLEAR INPUT FIELDS
  function clearInputs() {
    inputName.current.value = '';
    inputEmail.current.value = '';
    inputAge.current.value = '';
    setAge('');
  }

  // Handle age input change
  const handleAgeChange = (event) => {
    const value = event.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) { // Check if length is <= 3 and value is a number
      setAge(value);
    }
  };

  return (
    <div className='container'>
      <form className='form'>
        <h1>Cadastro de Usuários</h1>

        <input type="text" name="name" placeholder='Nome Completo' ref={inputName} maxLength={100} />
        <input type="email" name="email" placeholder='E-mail' ref={inputEmail} maxLength={254} />
        <input type="number" name="age"  placeholder='Idade'  ref={inputAge} value={age} onChange={handleAgeChange} min="0" max="999" />

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

export default Home;