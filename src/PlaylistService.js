import pg from 'pg';
const { Pool } = pg;

class PlaylistService {
    constructor() {
        this._pool = new Pool();
    }

    async getSongs({ playlistId }) {
        const query = {
            text: `SELECT * FROM playlists 
            JOIN playlist_songs AS ps ON playlists.id = ps.playlist_id
            JOIN songs ON songs.id = ps.song_id
            WHERE ps.playlist_id = $1`,
            values: [playlistId],
        };

        const result = await this._pool.query(query);
        const playlist = result.rows.map(({ playlist_id: id, name }) => ({
            id,
            name,
        }))[0];

        playlist.songs = result.rows.map(({ song_id: id, title, performer }) => ({
            id,
            title,
            performer
        }));

        return playlist;
    }
}

export default PlaylistService;