import { appwrite_endpoint, appwrite_project } from '$lib/enviroment/env.enviroment';
import { Account, Client, Databases } from 'appwrite';

const client = new Client();

client
.setEndpoint(appwrite_endpoint)
.setProject(appwrite_project);

export const account = new Account(client);
export const databases = new Databases(client);
