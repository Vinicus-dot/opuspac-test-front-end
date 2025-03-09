import axios from 'axios'

export default class AuthService {
  private baseUrl: string = import.meta.env.VITE_URL_API_AUTH + '/api/auth'

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/login`, {
        email,
        password
      })
      
      // Salvar o token no localStorage
      localStorage.setItem('token', response.data.token)
      
      return response.data
    } catch (error) {
      throw new Error('Erro ao fazer login')
    }
  }

  async register(email: string, password: string, name: string): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/register`, {
        email,
        password,
        name
      })
      
      return response.data
    } catch (error) {
      throw new Error('Erro ao registrar usuário')
    }
  }

  logout(): void {
    localStorage.removeItem('token')
  }
}