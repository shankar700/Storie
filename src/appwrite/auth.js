import conf from "../conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccout({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        // call another method - login after account creation
        this.login(email, password);
        return userAccount;
      } else {
        return false;
      }
    } catch (error) {
      console.error(`appwrite-create-account-error: ${error}`);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSesison(email, password);
    } catch (error) {
      console.error(`appwrite-login-error: ${error}`);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error(`appwrite-get-current-user-error: ${error}`);
    }

    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error(`appwrite-logout-error: ${error}`);
    }
  }
}

const authService = new AuthService();

export default authService;
