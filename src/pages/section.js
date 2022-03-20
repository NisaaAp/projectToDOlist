import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import "../style/section.css"

export default class Section extends React.Component{
    


constructor(){
    super()


        this.state = {
            data : [
                
                {
                    id: Math.floor(Math.random() * 10000),
                    title: "Kegiatan Hari Senin",
                    catatan: "Bangun Pagi",
                    status: false
                },
                {
                    id: Math.floor(Math.random() * 10000),
                    title: "Kegiatan Hari Minggu",
                    catatan: "Olahraga Pagi",
                    status: false
                },
                {
                    id: Math.floor(Math.random() * 10000),
                    title: "Kegiatan Hari Sabtu",
                    catatan: "Mengerjakan pr",
                    status: false
                }
            ],
            //data temporary
            id:"",
            title: "",
            catatan: "",
            status: false,
            action: "",
            selectedItem: null,
            search: "",
            filter:[],
            filterData:[],
            isModalOpen: false,
            user: ""

        }
        this.state.filter = this.state.data
    }


    setUser = () => {//fungsi mengetahui user
        if (sessionStorage.getItem("user") === null){
            //jika tidak ada, tinggal ditambahkan data user
            let input = window.prompt("Masukkan Nama Anda","")
            if(input === null || input === ""){
                this.setUser()
            }else{
                sessionStorage.setItem("user", input)
                this.setState({
                    user: input
                })
            }
        }
        else{
            //jika ada, tinggal ditampilkan
            let userName = sessionStorage.getItem("user") //mendapatkan data user
            this.setState({
                user : userName
            })
        }

    }
    handleCheck = (item) => {
        let tempData = this.state.data
        let index = tempData.indexOf(item)
        if (tempData[index].status === false) {
          tempData[index].status = true
          console.log(tempData[index].status)
        }
        else if (tempData[index].status === true) {
          tempData[index].status = false
          console.log(tempData[index].status)
        }
        this.setState({
          data: tempData
        })
    }
    handleChange = (e) => {
        
        this.setState({
            [e.target.name] : e.target.value
        });
    };
    handleSave = (e) => {
        e.preventDefault()//agar tidak tereser /refresh
        let tempData = this.state.data
        if (this.state.action === "insert"){
            //menambahkan data baru PUSH
            tempData.unshift({
            id: this.state.id,
            title: this.state.title,
            catatan: this.state.catatan,
            status: false
            })   
        }
        else if (this.state.action === "update"){
            let index = tempData.indexOf(this.state.selectedItem)
            tempData[index].id = this.state.id
            tempData[index].title = this.state.title
            tempData[index].catatan = this.state.catatan

            
        }

        this.setState({
            // status: false,
            data : tempData,
            isModalOpen: false
        })
    };
    add = () => {
        // $("#modal_buku").modal("show")
        this.setState({
            isModalOpen: true,
            id: Math.floor(Math.random() * 10000),
            title: "",
            catatan: "",
            action: "insert",
            status: false
        });
    };
    handleClose = () => {
        // $("#modal_buku").modal("show")
        this.setState({
            isModalOpen: false
        });
    };
    edit = (item) => {
        //data edit diambil dari data2 yang dimasukkan yang didefinisikan dengan nama "item"
         this.setState({
             isModalOpen: true,
            id: item.id,
            title: item.title,
            catatan: item.catatan,
             
            action: "update",
            selectedItem: item

         })
    };
    filterAll = (e) => {
        e.preventDefault()
        // console.log("completed")
        let tempData = this.state.data
        this.setState({   
        filter:  tempData.filter(item => item.status === true || item.status === false) 
        })
    }
    filterCompleted = (e) => {
        e.preventDefault()
        console.log("completed")
        let tempData = this.state.data
        this.setState({   
        filter:  tempData.filter(item => item.status === true)
        })
    }
    filterUNcompleted = (e) => {
        e.preventDefault()
        console.log("completed")
        let tempData = this.state.data
        this.setState({   
        filter:  tempData.filter(item => item.status === false)
        })
    }

    drop = (item) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            let tempData = this.state.data

            let index = tempData.indexOf(item)

            tempData.splice(index, 1)
            
            this.setState({
                data: tempData
            })
        }
    };


    
    search = (e) =>{
        if (e.keyCode === 13){
            let search = this.state.search.toLowerCase()
            //lowercase mencari dengan huruf kecil
            let tempData = this.state.data
            let result = tempData.filter(item => {
                return item.title.toLowerCase().includes(search) ||
                item.catatan.toLowerCase().includes(search) 
                
            })

            this.setState({
                filter: result
            })
            // console.log("search")
        }
    }

    componentDidMount= () => {//hanya dijalankan diawal fungsi mana yang mau dipanggil
        this.setUser()

    }
    render(){
        return(
            <div className="container-fluid">
            <div className="container-md bg-secondary bg-opacity-10"><br /><br />
            <div className="title">
            <h1 className='text-center' >To DO <del>List</del></h1>
            
            <br />
            </div>
                <div className="back rounded-3 ps-4 pe-4">  <br />    
                       
                    <h4 className="text-dark ps-5 pe-3 py-1">
                        Nama Pengguna : {this.state.user}
                    </h4><br />
                    <div className="d-flex flex-row justify-content-end col-11 ps-5 pe-5">
                    <input className="form-control rounded-pill bg-light bg-opacity-10 border border-3 me-3" type="text" name="search"  placeholder="Search" 
                    onChange={this.handleChange} onKeyUp={ e => this.search(e)} />
                    <AddCircleIcon onClick={() => this.add()} className="justify-content-end" sx={{ fontSize: 45 }}/>
                        </div>
                
                   <br /><br />
                    <div className="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group me-2 " role="group" aria-label="First group">
                            <button type="button" class="btn btn-dark" onClick={(e) => this.filterAll(e)}>All</button>
                        </div>
                        <div class="btn-group me-2" role="group" aria-label="Second group">
                            <button type="button" class="btn btn-dark" onClick={(e) => this.filterCompleted(e)}>Completed</button>
                        </div>
                        <div class="btn-group" role="group" aria-label="Third group">
                            <button type="button" class="btn btn-dark " onClick={(e) => this.filterUNcompleted(e)}>Uncompleted</button>
                        </div>
                        </div>

                    <br /><br />
                <div className="row ">   
                {this.state.filter.map((item, index) => (
                    <ul className="list-group list-group-horizontal list-group-item-action my-2 rounded-pill bg-light bg-opacity-50 " key={item.id}>
                    <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                      <button className="checkbox btn btn-outline" onClick={() => this.handleCheck(item)} style={{ textDecoration: item.status ? "line-through" : "" }} >
                        {item.status ? <CheckBoxIcon /> : <CheckBoxOutlinedIcon/>}
                      </button> 
                    </li>
                    <li className="list-group-item list-group-item-action pe-0 py-4 m-3 border-0  w-100 bg-light bg-opacity-10"
                            style={{ textDecoration: item.status ? "line-through" : "" }} >
                      <div className="d-flex flex-row justify-content-start mb-1 py-2">
                        <h5>{item.title}</h5>
                      </div>
                      <div className="d-flex flex-row justify-content-start mb-1">
                        <p>{item.catatan}</p>
                      </div>
                    </li>
                    {/* <small className="justify-content-end py-4 text-muted">{Date('YYYY-MM-DD')}</small> */}
                    <li className="list-group-item ps-3 pe-0 py-1 m-5 rounded-0 border-0 bg-transparent w-100">
                    <small className="justify-content-end py-4 text-muted">{Date('YYYY-MM-DD')}</small>
                      <div className="d-flex flex-row justify-content-end mb-1" size="large">
                      <IconButton aria-label="delete" size="large">
                        <EditOutlinedIcon onClick={() => this.edit(item)} sx={{ fontSize: 30 }}/>
                        
                        </IconButton>
                        <IconButton aria-label="delete" size="large">
                        <DeleteOutlinedIcon onClick={() => this.drop(item)} sx={{ fontSize: 30 }}/>
                        
                        </IconButton>
                        
                       
                      </div>
                      
                    </li>
                  </ul>
              
          ))}
          </div>
          </div>
        </div>
                
        

                 {/* ini Modal*/}
        <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Form Book</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSave(e) }>
          <Modal.Body>
          <Form.Group className="mb-3" controlId="id">
                <Form.Label>No ID</Form.Label>
                <Form.Control type="text" name="id" placeholder="Masukkan id" value={this.state.id} onChange={this.handleChange} disabled/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" placeholder="Masukkan Judul" value={this.state.title} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="catatan">
                <Form.Label>Catatan</Form.Label>
                <Form.Control as="textarea" type="text" name="catatan" placeholder="Masukkan Catatan Anda" value={this.state.catatan} onChange={this.handleChange} />
            </Form.Group>
            
          </Modal.Body>
          <Modal.Footer>
          
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={this.handleClose}>
              Save 
            </Button>
            
          </Modal.Footer>
          </Form>
        </Modal>
      </div>
        );
    }
}



    