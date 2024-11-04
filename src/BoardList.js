import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
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
        <td>1</td>
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
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {this.state.BoardList.map((item) => (
              <Board
                key={item.BOARD_ID}
                title={item.BOARD_TITLE}
                registerId={item.REGISTER_ID}
                date={item.REGISTER_DATE}
              />
            ))}
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
