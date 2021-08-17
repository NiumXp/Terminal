import { config } from 'dotenv';

import TerminalClient from './client/Client';

config();

const client = new TerminalClient();

client.init();
