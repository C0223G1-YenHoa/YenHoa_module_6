import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { createSong, getSong, updateSong } from '../service/song'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'


export default function SongUpdate() {
    const navigate = useNavigate()
    const param = useParams()
    const [song, setSong] = useState({})
    const songUpdate = async (id) => {
        const song = await getSong(id)
        setSong(song)
        console.log(song);
    }

    useEffect(() => {
        songUpdate(param.id)
    }, [param.id])
    const st = song.status

    const update = async (update) => {
        console.log(update);
        alert("A")
        await updateSong(param.id, { ...update, status: st.status }).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'chỉnh sửa thành công!!!!',
                showConfirmButton: false,
                timer: 1500
            })
        }
        )
        navigate('/')
    }

    return (
        <>
            {song.id &&
                <Formik initialValues={{ id: song.id, song: song.song, singer: song.singer, timer: song.timer, tym: song.tym }}
                    validationSchema={yup.object({
                        song: yup.string().required('Vui lòng nhập tên bài hát'),
                        singer: yup.string().min(1, "Tên ca sĩ tối thiểu 1 ký tự").max(30, "Tên ca sĩ tối đa 30 ký tự").required("Vui lòng nhập tên ca sĩ"),
                        time: yup.string().required("Vui lòng nhập thời gian phát"),
                        tym: yup.number().required("Vui lòng nhập số lượt yêu thích")
                    })}
                    onSubmit={(value) => {
                        alert("gt")
                        update(value);
                    }}
                >

                    <Form className="form">
                        <p className="title">Chỉnh sửa bài hát </p>
                        <div className="flex">
                            <Field name="id" type="hidden" className="input" />
                            <Field name="status" type="hidden" className="input" />
                            <label>
                                <Field name="song" type="text" className="input" />
                                <span>Tên bài hát</span>
                                <ErrorMessage component='div' name="song" className='text-red' />
                            </label>
                            <label>
                                <Field name="singer" type="text" className="input" />
                                <span>Ca sĩ</span>
                                <ErrorMessage component='div' name="singer" className='text-red' />
                            </label>
                        </div>

                        <label>
                            <Field name="timer" type="localtime" className="input" />
                            <span>Thời gian phát</span>
                            <ErrorMessage component='div' name="timer" className='text-red' />
                        </label>

                        <label>
                            <Field name="tym" placeholder="hh:mm" type="number" className="input" />
                            <span>Số lượt yêu thích</span>
                        </label>
                        <button type="submit" className="submit">Chỉnh sửa</button>
                    </Form>
                </Formik>}
        </>
    )

}