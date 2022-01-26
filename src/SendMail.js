import React from 'react'
import './SendMail.css'
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeSendMessage } from './features/mailSlice';
import { collection,  addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';


function SendMail() {

   const dispatch = useDispatch();
   // Use form hooks
    const {register, handleSubmit, formState: { errors } } = useForm();
    console.log(errors);


    /* When clicking send, add this information to the firestore*/
   const onSubmit = async (formData) => {
        console.log(formData)
        const collectionRef = collection(db,'emails');
        const payload = {
            to: formData.to,
            subject: formData.subject,
            message: formData.message,
            timestamp: serverTimestamp()
        }
        await addDoc(collectionRef,payload);
        dispatch(closeSendMessage())
    }
    return (
        <div className="sendMail">
            <div className="sendMail_header">
                <h3>New Message</h3>
                <CloseIcon  onClick={() => dispatch(closeSendMessage())} className="sendMail_close"/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="to" placeholder="To" type="email" {...register("to", { required: 'This is required'})} />
                <p className="sendMail_error">{errors.to?.message}</p>

                <input name="subject" placeholder="Subject" type="text" {...register("subject", { required: 'This is required' })}/>
                <p className="sendMail_error">{errors.subject?.message}</p>

                <input name="message" placeholder="Message..." className="sendMail_message" type="text" {...register("message", { required: 'This is required' })} />
                <p className="sendMail_error">{errors.message?.message}</p>
                
                <div className="sendMail_options">
                    <Button 
                    className="sendMail_send"
                    variant="contained"
                    color="primary"
                    type="submit"
                    >Send</Button>
                </div>
            </form>
        </div>
    )
}

export default SendMail
