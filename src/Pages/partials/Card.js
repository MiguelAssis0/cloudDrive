import React, { useState, useEffect } from 'react';
import { db, storage, storageRef, deleteDoc, getDownloadURL, doc, deleteObject, getDocs, collection, where } from '../../Firebase';
import { FaDownload } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { SlOptionsVertical } from 'react-icons/sl';
import word from "../../public/image/office.png";
import powerpoint from "../../public/image/office (1).png";
import excel from  "../../public/image/office365.png";
import pdf from "../../public/image/pdf.png";
import text from "../../public/image/text.png";


export default function Card({ file, props }) {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const getFiles = async () => {
            const querySnapshot = await getDocs(collection(db, "arquivos"), where("uid", "==", props.uid));
            const docs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setFiles(docs);
        }
        getFiles();
    }, []);

    const openOptions = (e) => {
        const options = e.currentTarget.nextSibling;
        options.style.display = "block";
    }

    

    const downloadFile = async (fileName) => {
        try {
            const fileRef = storageRef(storage, `arquivos/${props.name}/${fileName}`);
            const url = await getDownloadURL(fileRef);
            window.open(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }

    const deleteFile = async (id, fileName) => {
        try {
            const fileRef = storageRef(storage, `arquivos/${props.name}/${fileName}`);
            await deleteObject(fileRef);
            const docRef = doc(db, "arquivos", id);
            await deleteDoc(docRef);

            setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
            window.location.reload();
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };


    return (
        <div className="card" key={file.id}>
            <div className="card__image">
                <img src={
                    file.type.startsWith('image/') ? file.url :
                    file.type.startsWith('text/') ? text :
                    file.type.startsWith('application/pdf') ? pdf :
                    file.type.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ? excel :
                    file.type.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document') ? word :
                    file.type.startsWith('application/vnd.openxmlformats-officedocument.presentationml.presentation') ? powerpoint :
                    "https://img.icons8.com/color/144/file.png"
                }
                    width={file.type.startsWith('image/') ? 100 : 50}
                    alt={file.name} />
            </div>
            <div className="card__body">
                <div className="card__options">
                    <p title={file.name}>{file.name.substring(0, 15)}{file.name.length > 15 ? '...' : ''}</p>
                    <SlOptionsVertical onClick={(e) => openOptions(e)} />
                    <div className="card__options__options">
                        <button onClick={() => downloadFile(file.name)}><FaDownload /> Download</button>
                        <button onClick={() => deleteFile(file.id, file.name)} className="delete"><MdDelete /> Deletar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}