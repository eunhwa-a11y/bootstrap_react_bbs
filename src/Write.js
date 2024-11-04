import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";

export default class Write extends Component {
  // Update.js를 만들지 않고 수정할 때 사용 예정
  state = {
    isModifyMode: false,
    title: "",
    content: "",
  };
  write = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:8000/insert', {
      title: this.state.title,
      content: this.state.content
    }) // 요청을 보냄
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        // 에러 핸들링
        console.log(e);
      });
  };
  handleChange = (e) => {
    this.setState({
      // title: e.target.value
      [e.target.name]:e.target.value // 계산된 속성
    })
    console.log(this.state);
  }

  render() {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" name="title" placeholder="제목을 입력하세요." onChange={this.handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" name="content" rows={3} onChange={this.handleChange} />
        </Form.Group>
        <div className="d-flex gap-1">
          <Button variant="primary" type="submit" onClick={this.write}>
            작성 완료
          </Button>
          <Button variant="secondary" type="reset">
            취소
          </Button>
        </div>
      </Form>
    );
  }
}
