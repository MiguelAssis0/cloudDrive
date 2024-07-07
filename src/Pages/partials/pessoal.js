import { FaPlus, FaFolder } from "react-icons/fa";
import { useEffect, useState } from "react";
import "../../public/Pessoal.css";
import { db, collection, getDocs, limit, query, where } from "../../Firebase";
import Card from "./Card";


export default function Pessoal(props) {
    const [files, setFiles] = useState([]);
    useEffect(() => {
        const getFiles = async () => {
            const q = query(collection(db, "arquivos"), where("uid", "==", props.props.login.uid), limit(8));
            const querySnapshot = await getDocs(q);
            const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFiles(docs);
        }
        getFiles();
    }, []);

    const closeOptions = (event) => {
        const options = document.querySelectorAll(".card__options__options");
        options.forEach(option => {
            const openOptionsButton = option.closest('.card__options').querySelector('svg');
            if (option && openOptionsButton && !option.contains(event.target) && !openOptionsButton.contains(event.target)) {
                option.style.display = "none";
            }
        });
    }

    return (
        <div className="main__content__pessoal" onClick={closeOptions}>
            <div className="pessoal__header">
                <h1>Bem vindo, {props.props.login.name}!</h1>
            </div>
            <div className="pessoal__body">
                <p>Recomendações</p>
                <div className="pessoal__body__recomendations">
                    {files.map((file, index) => (
                        <Card file={file} key={index} props={props.props.login}/>
                    ))}
                </div>
                <div className="pessoal__body__actions">
                    <form>
                        <label htmlFor="file"><FaPlus />Novo</label>
                        <input type="file" name="file" id="file" className="hidden-input" />
                    </form>
                </div>
            </div>
        </div>
    );
}
