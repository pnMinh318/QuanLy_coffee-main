import React, { useEffect, useState } from 'react'
import './Homepage.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
function Homepage(props) {
    //Lấy Bearer Token
    const tokenBearer = localStorage.getItem("tokenBearer");
    //Lấy Data
    const [requestData, setRequestData] = useState(new Date());
    const [viewList, setList] = useState([{ phone: 0, name: "", price: 0 }]);
    useEffect(() => {
        axios.get(`http://localhost:5000/api/table?page=1&pagesize=100`)
            .then((response) => {
                setList(response.data.tables)
            })
    }, [requestData])
    //Set Modal Active
    const [viewModal, setViewModal] = useState(true);
    //Default new table
    const [selectedName, setName] = useState("")
    // Thêm bàn mới
    function addingTable(selectedName) {
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/table/',
            data: {
                tablePoin: selectedName
            },
            headers: {
                'Authorization': `bearer ${tokenBearer}`,
                'Content-Type': 'application/json'
            },
        }).then(() => {
            setRequestData(new Date());
        })
    }
    // Order 
    const navigate = useNavigate();
    function orderTable(table) {
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/order',
            data: {
                table: table
            },
            headers: {
                'Authorization': `bearer ${tokenBearer}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data._id) {
                navigate('/order/' + response.data._id)
            } else {
                console.log("Error")
            }
        })
    }
    return (
        <>
            {/* <Login /> */}
            <div className="homepage">
                <div className="homepage__header-list">
                    {/* <div className="homepage__header-item homepage__header-item--title">
                        HOMEPAGE
                    </div> */}
                    <div className="homepage__header-item homepage__header-btn">
                        <button
                            className="homepage__btn-add"
                            onClick={() => setViewModal(!viewModal)}
                        >
                            + CREATE TABLE
                        </button>
                    </div>
                </div>
                <div className="homepage__contain">
                    {viewList.map(data => (
                        <button className="homepage__order-link" onClick={() => orderTable(data.tablePoin)} >
                            {data.tablePoin}
                        </button>
                    ))}
                </div>
            </div>
            {/* Modal Layout */}
            <div className={viewModal ? "modal--unactive" : "modal"}>
                <div className="modal__overlay"></div>
                <div className="modal__body">
                    <div style={{ display: "flex", "justify-content": "flex-end" }}>
                        <button
                            className="modal__btn-close"
                            onClick={() => setViewModal(!viewModal)}
                        >
                            X
                        </button>
                    </div>
                    <div className="newtable__content">
                        <div className="newtable__content-header">
                            CREATING NEW TABLE
                        </div>
                        <div className="newtable__content-list">
                            <div className="newtable__content-item">
                                <div className="newtable__lable">
                                    TABLE ORDER:
                                </div>
                                <div className="newtable__input">
                                    <input
                                        id="tablePoint"
                                        onChange={e => {
                                            setName(e.target.value)
                                        }}
                                        type="string"
                                        className="newtable__form"
                                        placeholder="TablePoint" />
                                </div>
                            </div>
                            <div className="newtable__content-item">
                                <div className="newtable__lable">
                                    TABLE SOURCE:
                                </div>
                                <div className="newtable__input">
                                    <input type="text" className="newtable__form" placeholder="Source" />
                                </div>
                            </div>
                        </div>
                        <div className="newtable__content-btn">
                            <button
                                className="newtable__btn newtable__btn--add"
                                onClick={() => {
                                    addingTable(selectedName)
                                    setViewModal(!viewModal)
                                }}
                            >
                                Add
                            </button>
                            <button
                                className="newtable__btn newtable__btn--cancle"
                                onClick={() => setViewModal(!viewModal)}
                            >
                                Cancle
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage
