import React, { useState} from "react";
import "./Home.css";
import axios from "../axios";

const Board = () => {
  const [currentImages, setCurrentImages] = useState(0);
  const [gridImages, setGridImages] = useState([]);
  const itemsPerLoad = 6;
  const maxItems = 18;

  const loadItems = async (e) => {
    console.log(e);
    if (currentImages >= maxItems) return;

    try {
      const response = await axios.get("/boards", {
        params: {
          start: currentImages,
          limit: itemsPerLoad,
        },
      });

      const newImages = response.data;
      setGridImages((prevImages) => [...prevImages, ...newImages]);
      setCurrentImages((prevCount) => prevCount + newImages.length);
    } catch (error) {
      console.error("이미지를 불러오는 중 오류 발생:", error);
    }
  };

  const handleNavClick = (action) => {
    console.log(`${action} 버튼이 클릭되었습니다.`);
  };


  return (
      <div className="content-container">
        <header className="header">
          <h1>갤러리</h1>
          <div className="nav-buttons">
            <button className="nav-btn" onClick={() => handleNavClick("업로드")}>
              업로드
            </button>
            <button className="nav-btn" onClick={() => handleNavClick("프로필")}>
              프로필
            </button>
            <button className="nav-btn" onClick={() => handleNavClick("로그아웃")}>
              로그아웃
            </button>
          </div>
        </header>

        <div className="grid-container">
          {gridImages.map((image) => (
              <div className="grid-image" key={image.id}>
                <div className="image-placeholder">{image.image}</div>
                <div className="board-content">
                  <h3>{image.title}</h3>
                  <p>{image.content}</p>
                </div>
              </div>
          ))}
        </div>

        {currentImages < maxItems && (
            <button className="load-more" onClick={loadItems}>
              더 보기
            </button>
        )}
      </div>
  );
};

export default Board;
