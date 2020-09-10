import React, {Component} from 'react';
import {Container, Row, Col, Button} from "reactstrap";
import {AvField, AvForm, AvRadioGroup, AvRadio} from "availity-reactstrap-validation";
import ReactToPrint from "react-to-print";
import {Modal} from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";

class DocumentForm extends Component {

    state = {
        delivery: [],
        correspondent: [],
        resDocument: [],
        regId: '',
        regDate: '',
        sourceDocId: '',
        sourceDocDate: '',
        deliveryId: '',
        correspondentId: '',
        topic: '',
        description: '',
        periodOfExecution: '',
        access: false,
        control: false,
        dbFileId: null,
        modal: false,
        selectedCorrespondent: '',
        selectedDelivery: '',
    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});

    };

    onChangePeriodOfExecution = event => {
        this.setState({
            periodOfExecution: event.target.value
        })

        if (Date.parse(this.state.regDate) > Date.parse(event.target.value)) {
            alert("срок исполнения не может быть раньше даты регистрации документа")
        }
    };

    onChangeSelect = (event) => {
        event.persist()
        this.setState({
            [event.target.name]: event.target.value
        });

    };

    onChangeRadio = event => {
        event.persist()
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    onFileUpload = event => {
        const formData = new FormData();
        formData.append(
            "file",
            event.target.files[0]
        );

        if (event.target.files[0].size > 1000000) {
            alert("Допустимый размер файла 1мб")
            event.target.value = null;
        } else {
            axios.post("/uploadFile", formData).then(res => {
                this.setState({
                    dbFileId: res.data.id
                })
            })
        }
    };

    onToggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }


    componentDidMount() {
        axios.get(`/delivery`)
            .then(res => {
                this.setState({
                    delivery: res.data._embedded.deliveries
                })
            })

        axios.get(`/correspondent`)
            .then(res => {
                this.setState({
                    correspondent: res.data._embedded.correspondents
                })
            })
    }

    render() {
        const {
            regId, regDate, sourceDocId, sourceDocDate, deliveryId, correspondentId,
            topic, description, periodOfExecution, access, control, dbFileId, modal
        } = this.state;

        const isEnabled = regId.length > 0 && regDate.length > 0 && correspondentId.length > 0 && topic.length > 0;

        const submit = (e) => {
            e.persist();

            if (Date.parse(regDate) > Date.parse(periodOfExecution)) {
                alert("срок исполнения не может быть раньше даты регистрации документа")
            } else {
                axios.post('/addDocument', {
                    regId,
                    regDate,
                    sourceDocId,
                    sourceDocDate,
                    deliveryId,
                    correspondentId,
                    topic,
                    description,
                    periodOfExecution,
                    access,
                    control,
                    dbFileId
                })
                    .then(res => {
                        this.setState({
                            resDocument: res.data,
                            selectedCorrespondent: res.data.correspondent.name,
                            selectedDelivery: res.data.deliveryForm != null ? res.data.deliveryForm.name : ''
                        })
                    })

                this.onToggle()
            }
        }

        let printData = <table className="table-bordered w-50 text-center align-content-center "
                               ref={el => (printData = el)}>
            <tbody>
            <tr>
                <th>Рег. №:</th>
                <td className="ml-5">{this.state.resDocument.regId}</td>
            </tr>
            <tr>
                <th>Дата рег.:</th>
                <td className="ml-5">{this.state.resDocument.regDate}</td>
            </tr>
            <tr>
                <th>№ исх. док-та:</th>
                <td className="ml-5">{this.state.resDocument.sourceDocId}</td>
            </tr>
            <tr>
                <th>Дата исх. док-та:</th>
                <td className="ml-5">{this.state.resDocument.sourceDocDate}</td>
            </tr>
            <tr>
                <th>Форма доставки :</th>
                <td className="ml-5">{this.state.selectedDelivery != null ? this.state.selectedDelivery : ''}</td>
            </tr>
            <tr>
                <th>Корреспондент:</th>
                <td className="ml-5">{this.state.selectedCorrespondent}</td>
            </tr>
            <tr>
                <th>Тема:</th>
                <td className="ml-5">{this.state.resDocument.topic}</td>
            </tr>
            <tr>
                <th>Описание:</th>
                <td className="ml-5">{this.state.resDocument.description}</td>
            </tr>
            <tr>
                <th>Срок исполнения:</th>
                <td className="ml-5">{this.state.resDocument.periodOfExecution}</td>
            </tr>
            <tr>
                <th>Доступ:</th>
                <td className="ml-5">{this.state.resDocument.access === true ? 'Да' : 'Нет'}</td>
            </tr>
            <tr>
                <th>Контроль:</th>
                <td className="ml-5">{this.state.resDocument.control === true ? 'Да' : 'Нет'}</td>
            </tr>
            </tbody>
        </table>;

        return (
            <div>
                <Container className="mt-3">
                    <AvForm onSubmit={submit}>
                        <Row>
                            <Col md={6}>
                                <label htmlFor="regId" className="font-weight-bold">Рег. № <span
                                    className="text-danger">*</span></label>
                                <AvField name="regId" id="regId" type="text"
                                         onChange={this.onChange.bind(this)}
                                         validate={{
                                             required: {value: true, errorMessage: 'Please enter a reg number'},
                                             pattern: {
                                                 value: '^[A-Za-z0-9]+$',
                                                 errorMessage: 'Your name must be composed only with letter and numbers'
                                             }
                                         }}/>
                            </Col>
                            <Col md={6}>
                                <label htmlFor="regDate" className="font-weight-bold">Дата рег <span
                                    className="text-danger">*</span></label>
                                <AvField name="regDate" id="regDate" type="date" onChange={this.onChange.bind(this)}
                                         required/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <label htmlFor="sourceDocId" className="font-weight-bold">№ исх. док-та</label>
                                <AvField name="sourceDocId" id="sourceDocId" type="text"
                                         defaultValue={sourceDocId}
                                         onChange={this.onChange.bind(this)}
                                         validate={{
                                             pattern: {
                                                 value: '^[A-Za-z0-9]+$',
                                                 errorMessage: 'Your name must be composed only with letter and numbers'
                                             }
                                         }}/>
                            </Col>
                            <Col md={6}>
                                <label htmlFor="sourceDocDate" className="font-weight-bold">Дата исх. док-та</label>
                                <AvField name="sourceDocDate" id="sourceDocDate" type="date"
                                         defaultValue={sourceDocDate} onChange={this.onChange.bind(this)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <label htmlFor="deliveryId" className="font-weight-bold">Форма доставки</label>
                                <AvField type="select" name="deliveryId" id="deliveryId" defaultValue={deliveryId}
                                         onChange={this.onChangeSelect.bind(this)}>
                                    <option value="">Tanlang</option>
                                    {this.state.delivery.map((object) => (
                                        <option key={object.id} value={object.id}>{object.name}</option>
                                    ))}
                                </AvField>
                            </Col>
                            <Col md={6}>
                                <label htmlFor="correspondentId" className="font-weight-bold">Корреспондент <span
                                    className="text-danger">*</span></label>
                                <AvField type="select" name="correspondentId" id="correspondentId"
                                         onChange={this.onChangeSelect.bind(this)} required>
                                    <option value="">Tanlang</option>
                                    {this.state.correspondent.map((object) => (
                                        <option key={object.id} value={object.id}>{object.name}</option>
                                    ))}
                                </AvField>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <label htmlFor="topic" className="font-weight-bold">Тема<span
                                    className="text-danger">*</span></label>
                                <AvField name="topic" id="topic" type="text"
                                         onChange={this.onChange.bind(this)}
                                         validate={{
                                             required: {value: true, errorMessage: 'Please enter a topic'},
                                             maxLength: {value: 100, errorMessage: '100 characters'}
                                         }}/>
                            </Col>
                            <Col md={6}>
                                <label htmlFor="description" className="font-weight-bold">Описание</label>
                                <AvField name="description" id="description" type="text"
                                         defaultValue={description}
                                         onChange={this.onChange.bind(this)}
                                         validate={{
                                             maxLength: {value: 1000, errorMessage: '1000 characters'}
                                         }}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <label htmlFor="access" className="font-weight-bold">Доступ</label>
                                <AvRadioGroup inline name="access" id="access" defaultValue={access}
                                              onChange={this.onChangeRadio.bind(this)}>
                                    <AvRadio label="Да" value={true}/>
                                    <AvRadio label="Нет" value={false}/>
                                </AvRadioGroup>
                            </Col>
                            <Col md={6}>
                                <label htmlFor="control" className="font-weight-bold">Контроль</label>
                                <AvRadioGroup inline name="control" id="control" defaultValue={access}
                                              onChange={this.onChangeRadio.bind(this)}>
                                    <AvRadio label="Да" value={true}/>
                                    <AvRadio label="Нет" value={false}/>
                                </AvRadioGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mt-3">
                                <label htmlFor="periodOfExecution" className="font-weight-bold">Срок исполнения</label>
                                <AvField name="periodOfExecution" id="periodOfExecution" type="date"
                                         defaultValue={periodOfExecution}
                                         helpMessage="срок исполнения не может быть раньше даты регистрации документа"
                                         onChange={this.onChangePeriodOfExecution.bind(this)}/>
                            </Col>
                            <Col md={6} className="mt-5">
                                <input type="file" name="dbFileId" defaultValue={dbFileId} onChange={this.onFileUpload}
                                       accept=".pdf, .doc, .docx" required/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={2} className="offset-10">
                                <Button disabled={!isEnabled} type="submit"
                                        className="btn btn-block enter-button btn-success">Save</Button>
                            </Col>
                        </Row>
                    </AvForm>
                </Container>

                <Modal
                    title="Print page"
                    centered
                    visible={modal}
                    onCancel={this.onToggle}
                    width={1000}
                    footer={[
                        <ReactToPrint
                            trigger={() => <button className="btn enter-button btn-primary">Print</button>}
                            content={() => printData}
                        />
                    ]}
                >
                    {printData}
                    {console.log(printData)}
                </Modal>

            </div>
        );
    }
}

export default DocumentForm;