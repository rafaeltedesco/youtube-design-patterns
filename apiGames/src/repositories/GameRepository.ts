import { RowDataPacket } from 'mysql2';
import connection from '../db/connection'

export default class GameRepository {
  async get(page = 1, limit = 10) {
    const [ result ] = await connection.query<RowDataPacket[]>('SELECT id, title, genre, platform, rating, release_year as releaseYear, sales_in_millions as salesInMillions FROM games LIMIT ? OFFSET ?', [limit, ((page -1) * limit)])

    return result;
  }
}
