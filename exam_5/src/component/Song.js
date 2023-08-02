import { useEffect, useState } from "react"
import { deleteSong, getSong, getSongPage, getSongs, searchSong, updateStatus } from "../service/song"
import { Link } from "react-router-dom";
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"


export default function Song() {
    const navigate = useNavigate()
    const [songs, setSongs] = useState([])
    const [song, setSong] = useState({})
    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(1)
    const limit = 3
    const [searchName, setSearchName] = useState('')

    const getSongList = async () => {
        
        const data = await getSongPage(page, limit)
        const list = await getSongs();
        // console.log(page);
        // console.log(page*limit+1);
        // console.log(data);
        setTotal(Math.ceil(list.length/limit))
        setSongs(data)
    }
   

    const onChangeHandle = (name) => {
        setSearchName(name)
    }

    const search = async () => {
        console.log(searchName);
        if (searchName != '') {
            const searchList = await searchSong(searchName,page,limit)
            console.log(searchList);
            setSongs(searchList)
            setTotal(Math.ceil(searchList.length/limit))
            navigate('/')
        }
        else {
            getSongList()
        }

    }

    useEffect(()=>{
        search()
    },[])


    useEffect(() => {
        getSongList()
    }, [page])

    const changeStatus = async (id) => {
        const song = await getSong(id)
        if (song.status.id == 2) {

            Swal.fire({
                icon: 'error',
                title: 'Bài hát này đã công khai!!!!',
                showConfirmButton: false,
                timer: 1500
            })

        } else {

            Swal.fire({
                title: 'Xác nhận',
                text: 'Bạn có muốn công khai bài hát ' + song.song + ' hay không ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Có',
                cancelButtonText: 'Không',
                reverseButtons: true
            }
            ).then(async (res) => {
                if (res.isConfirmed) {
                    await updateStatus(id, { ...song, status: { id: 2, status: 'Công khai' } })
                        .then(() => {
                            getSongList().then(() => {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Công khai thành công!!!!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            })
                        });
                } else if (res.dismiss === Swal.DismissReason.cancel) {
                }
            })

        }
        navigate('/')
    }



    return (
        <>
            <div className="row">
                <div className="col-4" style={{ border: 'solid 1px white', width: '100' }}>
                    <h5 style={{ color: 'white' }} >Tên bài hát:</h5><h3 style={{ color: 'white' }}> {song.song}</h3>
                    <h5 style={{ color: 'white' }} >Ca sĩ:</h5> <h4 style={{ color: 'white' }}> {song.singer}</h4>
                </div>

                <div className="search-container col-4" style={{ paddingLeft: 40 }} >
                    <input type="text" onChange={(e) => onChangeHandle(e.target.value)} name="song" placeholder="Search..." className="search-input" />
                    <a href="#" className="search-btn">
                        <i className="fas fa-search" ></i>
                    </a>
                </div>
                <div className="col-2" >
                    <button className="btn btn-outline-light" onClick={() => search()}>Search</button>
                </div>
                <div className="col-2" >
                    <a href="/create" className="btn btn-outline-light">Đăng kí bài hát</a>
                </div>
            </div>

            <div className="container">
                <h1>Kho nhạc</h1>
                <table className="rwd-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên bài hát</th>
                            <th>Ca sĩ</th>
                            <th>Thời gian phát</th>
                            <th>Số lượt yêu thích</th>
                            <th>Trạng thái</th>
                            <th>Chức năng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            songs.map((song, index) =>
                                <tr key={index}>
                                    <td data-th="Supplier Name">
                                        {index + 1}
                                    </td>
                                    <td data-th="Supplier Name">
                                        <a type="button" onClick={async () => {
                                            const checkSong = await getSong(song.id)
                                            setSong(checkSong)
                                        }}>{song.song}</a>
                                    </td>
                                    <td data-th="Supplier Name">
                                        {song.singer}
                                    </td>
                                    <td data-th="Supplier Name">
                                        {song.time}
                                    </td>
                                    <td data-th="Supplier Name">
                                        {song.tym}
                                    </td>
                                    <td data-th="Supplier Name">
                                        {song.status.status}
                                    </td>
                                    <td data-th="Supplier Name">
                                        <button className="btn btn-outline-info" onClick={() => changeStatus(song.id)}>Công khai</button>
                                    </td>
                                    <td data-th="Supplier Name">
                                        <button className="btn btn-outline-info" onClick={() => {
                                            Swal.fire({
                                                title: 'Are you sure?',
                                                text: 'You will not be able to recover this file!',
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonText: 'Yes, delete it!',
                                                cancelButtonText: 'No, cancel!',
                                                reverseButtons: true
                                            }
                                            ).then(async (res) => {
                                                if (res.isConfirmed) {
                                                    await deleteSong(song.id).then(() => {
                                                        getSongList().then(() => {
                                                            Swal.fire({
                                                                icon: 'success',
                                                                title: 'Delete success fully!!!!',
                                                                showConfirmButton: false,
                                                                timer: 1500
                                                            })
                                                        })
                                                    });
                                                } else if (res.dismiss === Swal.DismissReason.cancel) {
                                                }
                                            })
                                        }} >Delete</button>

                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
            <div style={{ textAlign: 'center', marginTop: 10 }}>
                <button className="btn btn-outline-info"
                     disabled={page <= 0}
                     onClick={ () => {
                         setPage( page - 1);
                          getSongList()
                     }}
                >Prev</button>
                <button className="btn btn-outline-info"
                    disabled={page >= (total-1)}
                    onClick={() => {
                        setPage(page + 1)
                        getSongList()
                    }}
                >Next</button>
            </div>
        </>
    )
}