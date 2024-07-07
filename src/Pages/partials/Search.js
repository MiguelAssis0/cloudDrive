import { useState, useEffect, useRef } from "react";
import { db, collection, getDocs, where } from "../../Firebase";
import Card from "./Card";

export default function Search({ props }) {
    const [files, setFiles] = useState([]);
    const optionsRef = useRef([]);
    const inputSearch = document.querySelector("#search");

    useEffect(() => {
        const getFiles = async () => {
            const querySnapshot = await getDocs(collection(db, "arquivos"), where("uid", "==", props.login.uid));
            const docs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).filter(file => file.name.toLowerCase().includes(inputSearch.value.toLowerCase()) && props.login.uid === file.uid);
            setFiles(docs);
        };
        getFiles();
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            optionsRef.current.forEach((ref) => {
                if (ref && !ref.contains(event.target)) {
                    ref.style.display = "none";
                }
            });
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
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
        <div className="search" onClick={closeOptions}>
            {files.map((file, index) => (
                <Card file={file} key={index} props={props.login}/>
            ))}
        </div>
    );
}
