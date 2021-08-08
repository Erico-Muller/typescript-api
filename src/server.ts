import { server } from './app'

const PORT: number = 4000

server.listen(PORT, () => { console.log(`listen at http://localhost:${PORT}/`) })