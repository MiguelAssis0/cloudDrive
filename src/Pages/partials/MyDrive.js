import React from "react";
import { useEffect, useState } from "react";
import "../../public/Pessoal.css";
import { db, collection, getDocs,  where, query } from "../../Firebase";
import Card from "./Card";


export default function MyDrive(props) {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const getFiles = async () => {
            const q = query(collection(db, "arquivos"), where("uid", "==", props.props.login.uid));
            const querySnapshot = await getDocs(q);
            const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFiles(docs);
        }
        getFiles();
    }, []);

    return (
        <div className="content__mydrive">
            <h1>Meu Drive</h1>
            <div className="pessoal__body__recomendations">
                    {files.map((file, index) => (
                        <Card file={file} key={index} props={props.props.login} />
                    ))}
                </div>
        </div>
    );
}