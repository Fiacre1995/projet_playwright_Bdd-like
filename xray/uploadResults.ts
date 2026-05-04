import fs from 'fs';
import axios from 'axios';

const CLIENT_ID: string = 'YOUR_CLIENT_ID';
const CLIENT_SECRET: string = 'YOUR_CLIENT_SECRET';

async function upload(): Promise<void> {
  try {
    // 1. Auth
    const authResponse = await axios.post<string>(
      'https://xray.cloud.getxray.app/api/v2/authenticate',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }
    );
    const token: string = authResponse.data;

    // 2. Lire le rapport
    const results: string = fs.readFileSync('reports/results.xml', 'utf8');

    // 3. Upload
    const response = await axios.post<unknown>(
      'https://xray.cloud.getxray.app/api/v2/import/execution/junit',
      results,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'text/xml',
        },
      }
    );

    console.log('Upload réussi:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erreur upload:', error.response?.data ?? error.message);
    } else {
      console.error('Erreur inattendue:', error);
    }
  }
}

upload();