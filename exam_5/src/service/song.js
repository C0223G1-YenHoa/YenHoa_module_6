import axios from 'axios'

axios.defaults.baseURL='http://localhost:8080/'
export async function getSongs(){
    const res= await axios.get('songs')
    return res.data;
}
export async function getSongPage(pages,limit){
    const res= await axios.get('songs/page/'+pages+'/'+limit)
    return res.data;
}
export async function getSong(id){
    const res= await axios.get('songs/searchId/'+id)
    return res.data;
}
export async function deleteSong(id){
     await axios.delete('songs/'+id)
  
}
export async function searchSong(songName){
    const res= await axios.get('songs/search/'+songName)
    return res.data;
}
export async function createSong(song){
    await axios.post('songs',song)
    
}
export async function updateStatus(id,song){
    await axios.put('songs/'+id,song)
    
}
export async function updateSong(id,song){
    await axios.put('songs/'+id,song)
}

