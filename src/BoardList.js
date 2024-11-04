import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Axios from "axios";

/*
const submitText = () => {
  // react가 서버로 요청을 보내고, 그 결과를 출력
  // 지정된 ID를 가진 유저에 대한 요청
  Axios.get("http://localhost:8000/") // 요청을 보냄
    .then(function (response) {
      // 성공 핸들링
      alert("등록 완료!"); // 요청의 결과 출력
      console.log(response);
    })
    .catch(function (error) {
      // 에러 핸들링
      console.log(error);
    });
};
*/

class Board extends Component {
  render() {
    return (
      <tr>
        <td>
          <Form.Check // prettier-ignore
            type="checkbox"
            id={`default-checkbox`}
            value={this.props.id}
            // 체크가 됐을 때 onCheckboxChange 함수 실행
            onChange={(e) => {
              this.props.onCheckboxChange(e.target.checked, e.target.value)
            }} 
          />
        </td>
        <td>{this.props.id}</td>
        <td>{this.props.title}</td>
        <td>{this.props.registerId}</td>
        <td>{this.props.date}</td>
      </tr>
    );
  }
}

export default class BoardList extends Component {
  state = {
    BoardList: [],
    checkList: []
  }

  onCheckboxChange = (checked, id) => {
    // 스프레드 연산자를 이용해 배열을 풀어헤치고
    const list = [...this.state.checkList];
    if(checked){
      if(!list.includes(id)){
        list.push(id); // 리스트에 밀어 넣고
      }
    }else{
      let idx = list.indexOf(id);
      list.splice(idx, 1)
    }

    this.setState({ // setState를 이용해 바꿔 줌
      checkList:list
    })
    console.log(this.state.checkList);
  }

  getList = () => {
    Axios.get("http://localhost:8000/list") // 요청을 보냄
      .then((res) => {
        // const data = res.data; 아래처럼 작성한 것 과 같음
        const { data } = res; // destructuring 비구조 할당
        this.setState({
          BoardList: data,
        });
        console.log(data);
      })
      .catch((e) => {
        // 에러 핸들링
        console.log(e);
      });
  };
  componentDidMount() {
    this.getList();
  }

  render() {
    console.log(this.state.BoardList);
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>선택</th>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {this.state.BoardList.map(
              (item) => (<Board
              key={item.BOARD_ID}
              id={item.BOARD_ID}
              title={item.BOARD_TITLE}
              registerId={item.REGISTER_ID}
              date={item.REGISTER_DATE}
              onCheckboxChange={this.onCheckboxChange}
              />))}
          </tbody>
        </Table>
        <div className="d-flex gap-1">
          <Button variant="primary">글쓰기</Button>
          <Button variant="secondary">수정하기</Button>
          <Button variant="danger">삭제하기</Button>
        </div>
      </>
    );
  }
}
