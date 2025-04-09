import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// Componente Logo SVG
const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#2563EB"/>
    <path d="M8 20C8 13.3726 13.3726 8 20 8C26.6274 8 32 13.3726 32 20C32 26.6274 26.6274 32 20 32" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <path d="M20 32C16.6863 32 14 29.3137 14 26C14 22.6863 16.6863 20 20 20C23.3137 20 26 22.6863 26 26C26 29.3137 23.3137 32 20 32Z" fill="white"/>
    <path d="M14 14L26 14" stroke="white" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

// Layout Principal
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Barra superior */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Logo />
            <h1 className="text-2xl font-bold">SisClientes</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:text-blue-200 font-medium">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/cadastro" className="hover:text-blue-200 font-medium">
                  Cadastrar
                </Link>
              </li>
              <li>
                <Link to="/gestao" className="hover:text-blue-200 font-medium">
                  Gerenciar
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} SisClientes - Sistema de Cadastro de Clientes</p>
      </footer>
    </div>
  );
};

// Página Inicial
const Home = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao SisClientes</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Sistema completo para gerenciamento de clientes com cadastro, consulta, atualização e remoção.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-3 text-blue-600">Cadastro de Clientes</h2>
          <p className="text-gray-600 mb-4">
            Adicione novos clientes ao sistema com todas as informações necessárias.
          </p>
          <Link 
            to="/cadastro" 
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Cadastrar Cliente
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-3 text-blue-600">Gestão de Clientes</h2>
          <p className="text-gray-600 mb-4">
            Visualize, pesquise, edite e remova os clientes já cadastrados.
          </p>
          <Link 
            to="/gestao" 
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Gerenciar Clientes
          </Link>
        </div>
      </div>
    </div>
  );
};

// Formulário de Cadastro
const CadastroForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    data_nascimento: '',
    ativo: true,
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [editingId, setEditingId] = useState(null);
  
  // URL da API (apenas para testes localmente)
  const API_URL = 'http://localhost:4000';
  
  // Extrai o ID do cliente da URL se estivermos em modo de edição
  useEffect(() => {
    const url = new URL(window.location.href);
    const clientId = url.searchParams.get('id');
    
    if (clientId) {
      fetchClientDetails(clientId);
    }
  }, []);
  
  // Busca os detalhes do cliente para edição
  const fetchClientDetails = async (id) => {
    try {
      const response = await fetch(`${API_URL}/clientes/${id}`);
      if (response.ok) {
        const client = await response.json();
        setFormData({
          nome: client.nome || client.name || '',
          email: client.email,
          telefone: client.telefone,
          endereco: client.endereco || '',
          data_nascimento: client.data_nascimento || '',
          ativo: client.ativo !== false,
        });
        setEditingId(id);
      } else {
        showMessage('Cliente não encontrado', 'error');
      }
    } catch (err) {
      console.error('Erro ao buscar detalhes do cliente:', err);
      showMessage('Erro ao carregar dados do cliente', 'error');
    }
  };
  
  // Atualiza o estado do form conforme o usuário digita
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Função para exibir mensagens temporárias
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };
  
  // Função para limpar o formulário
  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      endereco: '',
      data_nascimento: '',
      ativo: true,
    });
    setEditingId(null);
  };
  
  // Função para enviar os dados do formulário (cadastrar ou atualizar cliente)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let response;
      
      if (editingId) {
        // Atualizar cliente existente
        response = await fetch(`${API_URL}/clientes/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        // Cadastrar novo cliente
        response = await fetch(`${API_URL}/clientes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      
      if (response.ok) {
        showMessage(
          editingId ? 'Cliente atualizado com sucesso!' : 'Cliente cadastrado com sucesso!', 
          'success'
        );
        
        // Reseta o formulário
        resetForm();
        
        // Redireciona para a página de gestão após um breve delay
        setTimeout(() => {
          navigate('/gestao');
        }, 2000);
      } else {
        showMessage(
          editingId ? 'Erro ao atualizar cliente' : 'Erro ao cadastrar cliente', 
          'error'
        );
      }
    } catch (err) {
      console.error('Erro ao enviar dados do formulário:', err);
      showMessage('Erro ao processar solicitação', 'error');
    }
  };
  
  // Função para cancelar a edição
  const handleCancelEdit = () => {
    resetForm();
    navigate('/gestao');
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Mensagem de feedback */}
      {message.text && (
        <div className={`mb-4 p-3 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}
      
      {/* Painel de Cadastro */}
      <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
          {editingId ? 'Atualizar Cliente' : 'Cadastrar Novo Cliente'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input 
                id="nome"
                type="text" 
                name="nome"
                placeholder="Nome completo" 
                value={formData.nome}
                onChange={handleInputChange}
                required 
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                id="email"
                type="email" 
                name="email"
                placeholder="email@exemplo.com" 
                value={formData.email}
                onChange={handleInputChange}
                required 
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input 
                id="telefone"
                type="text" 
                name="telefone"
                placeholder="(00) 00000-0000" 
                value={formData.telefone}
                onChange={handleInputChange}
                required 
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
              <input 
                id="endereco"
                type="text" 
                name="endereco"
                placeholder="Rua, número, bairro, cidade" 
                value={formData.endereco}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="data_nascimento" className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
              <input 
                id="data_nascimento"
                type="date" 
                name="data_nascimento"
                value={formData.data_nascimento}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex space-x-2 justify-center mt-6">
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {editingId ? 'Atualizar' : 'Cadastrar'}
            </button>
            
            {editingId && (
              <button 
                type="button" 
                onClick={handleCancelEdit}
                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// Página de Gestão de Clientes
const GestaoClientes = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  
  // Filtros
  const [filters, setFilters] = useState({
    searchTerm: '',
    field: 'nome',
  });
  
  // URL da API (apenas para testes localmente)
  const API_URL = 'http://localhost:4000';
  
  // Função para buscar os clientes da API
  const getClients = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/clientes`);
      const data = await response.json();
      
      // Normalizar os dados para garantir que temos a propriedade 'nome'
      const normalizedData = data.map(client => ({
        ...client,
        nome: client.nome || client.name || '',
      }));
      
      setClients(normalizedData);
      setFilteredClients(normalizedData);
    } catch (err) {
      console.error('Erro ao buscar clientes:', err);
      showMessage('Erro ao carregar clientes', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  // UseEffect para carregar os clientes ao montar o componente
  useEffect(() => {
    getClients();
  }, []);
  
  // Função para exibir mensagens temporárias
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };
  
  // Função para editar um cliente
  const handleEdit = (client) => {
    navigate(`/cadastro?id=${client.id}`);
  };
  
  // Função para excluir um cliente
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        const response = await fetch(`${API_URL}/clientes/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          // Remove o cliente da lista
          setClients(prev => prev.filter(client => client.id !== id));
          setFilteredClients(prev => prev.filter(client => client.id !== id));
          showMessage('Cliente excluído com sucesso!', 'success');
        } else {
          showMessage('Erro ao excluir cliente', 'error');
        }
      } catch (err) {
        console.error('Erro ao excluir cliente:', err);
        showMessage('Erro ao excluir cliente', 'error');
      }
    }
  };
  
  // Função para aplicar filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // Aplica filtros quando os filtros mudarem
  useEffect(() => {
    if (!filters.searchTerm.trim()) {
      setFilteredClients(clients);
      return;
    }
    
    const searchTerm = filters.searchTerm.toLowerCase().trim();
    const filtered = clients.filter(client => {
      const fieldValue = String(client[filters.field] || '').toLowerCase();
      return fieldValue.includes(searchTerm);
    });
    
    setFilteredClients(filtered);
  }, [filters, clients]);
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Mensagem de feedback */}
      {message.text && (
        <div className={`mb-4 p-3 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}
      
      {/* Filtros de busca */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Filtrar Clientes</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">Buscar por</label>
            <select
              id="field"
              name="field"
              value={filters.field}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="nome">Nome</option>
              <option value="email">Email</option>
              <option value="telefone">Telefone</option>
              <option value="endereco">Endereço</option>
            </select>
          </div>
          
          <div className="flex-grow">
            <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-1">Termo de busca</label>
            <input
              id="searchTerm"
              type="text"
              name="searchTerm"
              placeholder="Digite para buscar..."
              value={filters.searchTerm}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="self-end">
            <button
              onClick={() => setFilters({ searchTerm: '', field: 'nome' })}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          Mostrando {filteredClients.length} de {clients.length} clientes
        </div>
      </div>
      
      {/* Lista de clientes */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Clientes Cadastrados</h2>
          <Link 
            to="/cadastro" 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            + Novo Cliente
          </Link>
        </div>
        
        {loading ? (
          <div className="p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
            <p className="mt-2 text-gray-600">Carregando clientes...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {clients.length === 0 
              ? "Nenhum cliente cadastrado." 
              : "Nenhum cliente encontrado com os filtros aplicados."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endereço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nascimento</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.map(client => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{client.nome || client.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{client.telefone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{client.endereco || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {client.data_nascimento ? new Date(client.data_nascimento).toLocaleDateString('pt-BR') : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(client)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(client.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente principal
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<CadastroForm />} />
          <Route path="/gestao" element={<GestaoClientes />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
