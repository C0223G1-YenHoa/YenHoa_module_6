import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { createSong } from '../service/song'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


export default function SongCreation() {
    const navigate = useNavigate()
    const create = async (song) => {
        console.log(song);
        await createSong({ ...song, status: { id: 1, status: 'Lưu trữ' } }).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Đăng kí thành công!!!!',
                showConfirmButton: false,
                timer: 1500
            })
        }
        )
        navigate('/')
    }

    return (
        <>
            <Formik initialValues={{ song: '', singer: '', time: '', tym: 0 }}
                validationSchema={yup.object({
                    song: yup.string().required('Vui lòng nhập tên bài hát'),
                    singer: yup.string().min(1, "Tên ca sĩ tối thiểu 1 ký tự").max(30, "Tên ca sĩ tối đa 30 ký tự").required("Vui lòng nhập tên ca sĩ"),
                    time: yup.string().required("Vui lòng nhập thời gian phát"),
                    tym: yup.number().required("Vui lòng nhập số lượt yêu thích")
                })}
                onSubmit={(value) => {
                    console.log(value);
                    create(value)
                }}
            >

                <Form className="form">
                    <p className="title">Đăng kí bài hát </p>
                    <div className="flex">
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
                        <Field name="time" type="localtime" className="input" />
                        <span>Thời gian phát</span>
                        <ErrorMessage component='div' name="time" className='text-red' />
                    </label>

                    <label>
                        <Field name="tym" placeholder="hh:mm" type="number" className="input" />
                        <span>Số lượt yêu thích</span>
                    </label>
                    <button type='submit' className="submit">Đăng kí</button>
                </Form>
            </Formik>
        </>
    )

}