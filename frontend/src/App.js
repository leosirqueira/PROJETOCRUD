import React, { useState, useEffect } from 'react';

function App() {
  // Estado para guardar a lista de clientes
  const [clients, setClients] = useState([]);
  // Estado para guardar os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    data_nascimento: '',
    ativo: true,
  });

  // URL da API (apenas para testes localmente)
  const API_URL = 'http://localhost:4000';

  // Função para buscar os clientes da API
  const getClients = async () => {
    try {
      const response = await fetch(`${API_URL}/clientes`);
      const data = await response.json();
      setClients(data);
    } catch (err) {
      console.error('Erro ao buscar clientes:', err);
    }
  };

  // UseEffect para carregar os clientes ao montar o componente
  useEffect(() => {
    getClients();
  }, []);

  // Atualiza o estado do form conforme o usuário digita
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Função para enviar os dados do formulário (cadastrar cliente)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const newClient = await response.json();
        // Adiciona o novo cliente à lista
        setClients(prev => [...prev, newClient]);
        // Reseta o formulário
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          endereco: '',
          data_nascimento: '',
          ativo: true,
        });
      } else {
        console.error('Erro ao cadastrar cliente');
      }
    } catch (err) {
      console.error('Erro ao enviar dados do formulário:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Cadastro de Clientes</h1>
      {/* Formulário de cadastro */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          name="nome"
          placeholder="Nome" 
          value={formData.nome}
          onChange={handleInputChange}
          required 
          style={{ margin: '5px' }}
        />
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
          value={formData.email}
          onChange={handleInputChange}
          required 
          style={{ margin: '5px' }}
        />
        <input 
          type="text" 
          name="telefone"
          placeholder="Telefone" 
          value={formData.telefone}
          onChange={handleInputChange}
          required 
          style={{ margin: '5px' }}
        />
        <input 
          type="text" 
          name="endereco"
          placeholder="Endereço" 
          value={formData.endereco}
          onChange={handleInputChange}
          style={{ margin: '5px' }}
        />
        <input 
          type="date" 
          name="data_nascimento"
          placeholder="Data de Nascimento" 
          value={formData.data_nascimento}
          onChange={handleInputChange}
          style={{ margin: '5px' }}
        />
        <button type="submit" style={{ margin: '5px', padding: '5px 10px' }}>
          Cadastrar
        </button>
      </form>
      {/* Lista de clientes */}
      <h2>Clientes Cadastrados</h2>
      {clients.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        <ul>
          {clients.map(client => (
            <li key={client.id}>
              {client.name} — {client.email} — {client.telefone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
