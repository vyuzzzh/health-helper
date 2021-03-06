import React, { useState } from 'react';
import './PatientAnalyzesForm.css';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { storage } from '../../firebase';
import { setAnalyzes } from '../../redux/actions';


const PatientAnalyzesForm = (props) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImage(image);
    }
  };

  const formHandler = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const today = new Date();
    const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    const uploadTask = storage.ref(`analyzes/${image.name}`).put(image);
    uploadTask.on('state_changed',
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage.ref('analyzes').child(image.name).getDownloadURL().then((url) => {
          setUrl({ url });
          props.setAnalyzes({ url, name, date });
          console.log(url);
        });
      });
  };

  return (
    <div className="patient-analyzes-form">
      <Form onSubmit={formHandler}>
        <FormGroup>
          <Label for="exampleEmail">Название анализа</Label>
          <Input type="text" name="name" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">Фото анализа</Label>
          <Input type="file" name="photo" onChange={handleChange} />
        </FormGroup>
        <Button type="submit">Отправить</Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  analyzes: state.analyzesReducer.analyzes,
});

const mapDispatchToProps = (dispatch) => ({
  setAnalyzes: (analyzes) => dispatch(setAnalyzes(analyzes)),
});


export default connect(mapStateToProps, mapDispatchToProps)(PatientAnalyzesForm);
