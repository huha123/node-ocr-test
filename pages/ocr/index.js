import React, { useEffect, useState } from "react";
import Tesseract from 'tesseract.js';

export default function Ocr() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  useEffect(() => {
    console.log('React useEffect Hook START !!!');
    console.log('## imagePath:', imagePath);

    return () => {
        console.log('React useEffect Hook CLEAN UP !!!');
    }
  });

	const handleChange = (event) => {
    console.log('onclick handleChange evnet:', event);
    setImagePath(URL.createObjectURL(event.target.files[0]));
  }

  const handleClick = () => {
    Tesseract.recognize(
      // imagePath,'eng+kor',
      imagePath,'eng+kor',
      { 
        logger: m => console.log(m) 
      }
    )
    .catch (err => {
      console.error(err);
    })
    .then(result => {
      // Get Confidence score
      console.log('### result::', result);
      let confidence = result.confidence
      let text = result.data.text
      setText(text);
    });

    Tesseract.recognize(
      // imagePath,'eng+kor',
      imagePath,'kor+eng',
      { 
        logger: m => console.log(m) 
      }
    )
    .catch (err => {
      console.error(err);
    })
    .then(result => {
      // Get Confidence score
      console.log('### result::', result);
      let confidence = result.confidence
      let text = result.data.text
      setText1(text);
    })

    Tesseract.recognize(
      // imagePath,'eng+kor',
      imagePath,'kor',
      { 
        logger: m => console.log(m) 
      }
    )
    .catch (err => {
      console.error(err);
    })
    .then(result => {
      // Get Confidence score
      console.log('### result::', result);
      let confidence = result.confidence
      let text = result.data.text
      setText2(text);
    })

  }


  return (
    <>
      <h1>OCR TEST PAGE</h1>
      <div>
        <>
          {
            imagePath !== ''
            ? <img src={imagePath} alt="logo"/>
            : ''
          }
          {/* <img src={imagePath} alt="logo"/> */}

          <div className="text-box">
            <p> ENG+KOR : {text} </p>
            <p> KOR+ENG : {text1} </p>
            <p> KOR : {text2} </p>
          </div>
          <input type="file" onChange={handleChange} />
          <button onClick={handleClick} style={{height:50}}> convert to text</button>
        </>
      </div>
    </>
  );
}