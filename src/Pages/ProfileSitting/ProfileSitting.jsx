import React, { useContext, useEffect, useRef, useState } from 'react'
import Style from './ProfileSitting.module.css'
import Icon from '../../Components/Icon/Icon'
import InputSitting from './InputSitting/InputSitting'
import { UserContext } from '../../Entrance/Entrance'
import { serverReq } from '../../functions'

export default function ProfileSitting() {
    const [user, setUser] = useContext(UserContext)
    const [img, setImg] = useState(user.profilePicture)
    const [error, setError] = useState('')
    const [loding, setLoding] = useState(false)
    const form = useRef(null)

    useEffect(() => {
        setError('')
    }, [img, user])

    

    async function saveFile(e) {
        e.preventDefault()
        console.log(img);
            try {
                setLoding(true)
                const updateUser = await serverReq('put', '/edit_user', {"data": {"profilePicture": img}})
                console.log(updateUser);
                setUser(updateUser)
                setLoding(false)
            } catch (error) {
                setError('שמירת התמונה נכשלה. מגבלת גודל: 1mb.')
                setLoding(false)
                console.log(`In InputForm page, error: ${error.response?.data?.error || error.message || error}`)
                
            }
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        setImg(base64)
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onloadend = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    return (
        <div className={Style.container}>
            <h1>הגדרות פרופיל</h1>
            <h3>
                {`שם משתמש: ${user.email}`}
            </h3>

            <form ref={form} onSubmit={e => saveFile(e)}>
                <input className={Style.inputImg} type="file" name="" id="imgInputForChange" onChange={(e) => uploadImage(e)}/>
            </form>

            <label htmlFor="imgInputForChange" className={Style.img} style={img ? {backgroundImage: `url(${img})`} : null}>
                {
                    !img &&
                    <i className="fas fa-user"></i>
                }
            </label>

            {
                img === user.profilePicture ?
                <label htmlFor="imgInputForChange" className={Style.iconLabele}>
                    <Icon
                        backgroundColor="#E57462" 
                        size="40px"
                        icon={`fas fa-pencil-alt`}
                        color="#F3F2DC"
                        fontSize="22px"
                    />
                </label>
                :
                <Icon
                    backgroundColor="#E57462" 
                    size="40px"
                    icon={`far fa-save`}
                    color="#F3F2DC"
                    fontSize="22px"
                    onClick={() => form.current.requestSubmit()}
                    style={{
                        marginTop: "-40px",
                        marginRight: "-135px"
                    }}
                />

            }
            <Icon
                backgroundColor="#E57462" 
                size="40px"
                icon={`fas fa-trash`}
                color="#F3F2DC"
                fontSize="22px"
                onClick={() => {
                    setImg("")
                    form.current.requestSubmit()                        
                    }}
                style={{
                    marginTop: "-40px",
                    marginLeft: "-135px",
                    marginBottom: "20px"
                }}
            />

            {
            loding && 
            <div className={Style.ldsRing}><div></div><div></div><div></div><div></div></div> 
            } 

            <h4>{error}</h4>

            <InputSitting
                text="שם פרטי"
                propartype="first"
                
            />
            <InputSitting
                text="שם משפחה"
                propartype="last"
                
            />

            
            
        </div>
    )
}
