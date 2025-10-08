export interface User {
	username: string;
	password: string;
	role?: string;
}

class AuthService {
	private users: User[] = [];

	constructor() {
		this.loadUsersFromEnv();
	}

	private loadUsersFromEnv() {
		const rawUsers = import.meta.env.VITE_USERS;

		try {
			this.users = JSON.parse(rawUsers);
		} catch (e) {
			console.error(' Error parsing VITE_USERS:', e);
			this.users = [];
		}
	}

	signIn(username: string, password: string): { success: boolean; user?: User; error?: string } {
		const user = this.users.find((u) => u.username === username && u.password === password);

		if (!user) {
			return { success: false, error: 'Credenciales inválidas' };
		}

		localStorage.setItem('user', JSON.stringify(user));
		return { success: true, user };
	}

	signOut(): void {
		localStorage.removeItem('user');
	}

	getCurrentUser(): User | null {
		const data = localStorage.getItem('user');
		return data ? JSON.parse(data) : null;
	}

	isAuthenticated(): boolean {
		return this.getCurrentUser() !== null;
	}

	getAllUsers(): User[] {
		return this.users;
	}
}

export const authService = new AuthService();
