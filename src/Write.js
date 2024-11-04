import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";

export default class Write extends Component {
  // Update.js를 만들지 않고 수정할 때 사용 예정
  state = {
    isModifyMode: false,
    title: '',
    content: '',
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
  
  update = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:8000/update', {
      title: this.state.title,
      content: this.state.content,
      id: this.props.boardId // 수정할 글 번호
    }) // 요청을 보냄
      .then((res) => {
        this.setState({ // setState 함수를 이용해서
          title: '', // title 비워주고
          content: '' // content도 비워준다
        })
        this.props.handleCancel();
      })
      .catch((e) => {
        // 에러 핸들링
        console.log(e);
      });
  };

  datail = () => {
    /*글 번호에 맞는 데이터 조회,
    글 결과를 title, content에 반영 그리고 수정 모드를 true로 변경*/
  }
  // this.prop.isModifyMode에 변동사항이 생기면 datail 함수 실행, componentDidUpdate 함수로 변동 사항이 있는지 없는지 확인하고 변동사항이 있으면 componentDidUpdate 함수 실행

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
        <Button variant="primary" type="submit" onClick={this.state.isModifyMode ? this.update : this.write}>{this.state.isModifyMode ? '수정완료' : '입력완료'}</Button>
          <Button variant="secondary" type="reset">
            취소
          </Button>
        </div>
      </Form>
    );
  }
}
