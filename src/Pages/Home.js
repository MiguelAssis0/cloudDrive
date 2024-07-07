import React, { useState, useEffect } from "react";
import Pessoal from "./partials/pessoal";
import MyDrive from "./partials/MyDrive";
import { db, auth, storage, storageRef, collection, addDoc, getDownloadURL, uploadBytesResumable, getDocs, query, where } from "../Firebase";
import { FaHouse } from "react-icons/fa6";
import { FaSignOutAlt, FaPlus, FaFolder } from "react-icons/fa";
import "../public/Home.css";
import Search from "./partials/Search";

export default function Home(props) {
    const [activeComponent, setActiveComponent] = useState("Pessoal");

    console.log();

    return (
        <div className="main">
            <Header props={props} setActiveComponent={setActiveComponent} />
            <Main props={props} activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        </div>
    );
}

function Header({ props, setActiveComponent }) {

    const searchFile = async (e) => {
        const input = document.querySelector("#search");
        input.value = e.target.value;
        setActiveComponent("Search");
        if(!input.value){
            setActiveComponent("Pessoal");
        }

    };

    return (
        <header>
            <div className="header__logo" onClick={() => window.location.href = `/`}>
                <span>Cloud</span>Drive
            </div>
            <div className="header__search">
                <input type="text" onChange={(e) => searchFile(e)} placeholder="Pesquisar" id="search" />
            </div>
            <div className="header__profile">
                <img src={props.login.foto} alt="profile" />
            </div>
        </header>
    );
}

function Main({ props, activeComponent, setActiveComponent }) {

    const renderComponent = () => {
        switch (activeComponent) {
            case "Pessoal":
                return <Pessoal props={props} />;
            case "MyDrive":

                return <MyDrive props={props} />;
            case "Search":
                return <Search props={props} />;
            default:
                return <Pessoal props={props} />;
        }
    };

    const addFile = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
    
        if (file) {
            const userFolderRef = storageRef(storage, `arquivos/${props.login.name}`);
            const fileRef = storageRef(storage, `arquivos/${props.login.name}/${file.name}`);
            const uploadTask = uploadBytesResumable(fileRef, file);
            const progressBar = document.querySelector('.main__progress');
            const actualProgress = document.querySelector('#progress');
    
            // Verificação de duplicidade antes do upload
            try {
                const querySnapshot = await getDocs(query(collection(db, 'arquivos'), where('uid', '==', auth.currentUser.uid), where('name', '==', file.name)));
                if (!querySnapshot.empty) {
                    alert('Um arquivo com esse nome já existe. Por favor, escolha outro nome.');
                    event.target.value = '';
                    return;
                }
            } catch (error) {
                console.error('Erro ao verificar a existência do arquivo:', error);
                alert('Erro ao verificar a existência do arquivo');
                event.target.value = '';
                return;
            }
    
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    progressBar.style.display = 'block';
                    actualProgress.style.width = `${progress}%`;
                    console.log('Progresso do upload: ' + progress + '%');
                },
                (error) => {
                    console.error('Erro ao enviar o arquivo:', error);
                    alert('Falha ao enviar o arquivo');
                    event.target.value = '';
                    progressBar.style.display = 'none';
                },
                async () => {
                    try {
                        const url = await getDownloadURL(fileRef);
    
                        await addDoc(collection(db, 'arquivos'), {
                            uid: auth.currentUser.uid,
                            name: file.name,
                            url: url,
                            type: file.type,
                            createdAt: new Date()
                        });
                        event.target.value = '';
                        progressBar.style.display = 'none';
                        window.location.reload();
                    } catch (error) {
                        console.error('Erro ao salvar o arquivo no banco de dados:', error);
                        alert('Erro ao enviar o arquivo');
                        event.target.value = '';
                        progressBar.style.display = 'none';
                    }
                }
            );
        } else {
            alert('Nenhum arquivo selecionado');
            event.target.value = '';
        }
    };

    const Close = () => {
        auth.signOut();
        window.location.reload();
    }


    return (
        <main>
            <div className="main__progress"><div id="progress"></div></div>
            <div className="main__sidebar">
                <form id="AddFile" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="file"><FaPlus />Novo</label>
                    <input type="file" name="file" id="file" className="hidden-input" onChange={addFile} />
                </form>
                <div className="sidebar__folders btn">
                    <div
                        className="folders__pessoal"
                        onClick={() => setActiveComponent("Pessoal")}
                        id="Pessoal"
                    >
                        <span><FaHouse /> Início</span>
                    </div>
                    <div
                        className="folders__folder btn"
                        onClick={() => setActiveComponent("MyDrive")}
                        id="MyDrive"
                    >
                        <span><FaFolder /> Meu Drive</span>
                    </div>
                </div>
                <button className="SignOut" onClick={Close}>
                    Sair <FaSignOutAlt />
                </button>
            </div>
            <div className="main__content">
                {renderComponent()}
            </div>
        </main>
    )
}