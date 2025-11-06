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
		const users: User[] = [];

		for (let i = 1; i <= 10; i++) {
			// soporta hasta 10 usuarios por ejemplo
			const username = import.meta.env[`VITE_USER${i}_USERNAME`];
			const password = import.meta.env[`VITE_USER${i}_PASSWORD`];
			const role = import.meta.env[`VITE_USER${i}_ROLE`];

			if (username && password) {
				users.push({ username, password, role });
			}
		}

		this.users = users;
	}

	signIn(username: string, password: string): { success: boolean; user?: User; error?: string } {
		const user = this.users.find((u) => u.username === username && u.password === password);

		if (!user) return { success: false, error: 'Credenciales inválidas' };

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
