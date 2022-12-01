import './reset.css'
import './App.css';
import { useState } from 'react'


function App() {
  const 할일스토리지 = JSON.parse(localStorage.getItem('todo')) || ['React의 첫 발걸음입니다.']
  const 날짜스토리지 = JSON.parse(localStorage.getItem('day')) || [new Date().toLocaleString('ko-KR')]

  const 목록렌더링 = () => {
    할일스토리지.unshift(할일입력)
    날짜스토리지.unshift(입력날짜)
    localStorage.setItem('todo', JSON.stringify(할일스토리지))
    localStorage.setItem('day', JSON.stringify(날짜스토리지))

    const copy할일목록 = [...할일목록]
    copy할일목록.unshift(할일입력)
    set할일목록(copy할일목록)

    const copy날짜 = [...날짜]
    copy날짜.unshift(입력날짜)
    set날짜(copy날짜)
    set할일입력('')
  }

  const 할일삭제 = (i) => {
    const copy할일목록 = [...할일목록]
    const copy날짜 = [...날짜]
    copy할일목록.splice(i, 1)
    copy날짜.splice(i, 1)
    set할일목록(copy할일목록)
    set날짜(copy날짜)
    localStorage.setItem('todo', JSON.stringify(copy할일목록))
    localStorage.setItem('day', JSON.stringify(copy날짜))
  }

  setTimeout(() => {
    set제목날짜([new Date().toLocaleString('ko-KR')])
  }, 1000);
  
  const [제목날짜, set제목날짜] = useState([new Date().toLocaleString('ko-KR')])
  const [할일목록, set할일목록] = useState(할일스토리지)
  const [날짜, set날짜] = useState(날짜스토리지)
  const [할일입력, set할일입력] = useState('')
  const [입력날짜, set입력날짜] = useState([new Date().toLocaleString('ko-KR')])



  return (
    <div className="App">
      <div className="cont-main">
        <h1 className="txt-header">{제목날짜[0]}</h1>
        <div className="cont-todolist">
          <ul>
            {
              할일목록.map((e, i) => {
                return (
                  <li className="li-todo" key={i}>
                    <p>{할일목록[i]}</p>
                    <div className='cont-control'>
                      <button onClick={(e) => {
                        할일삭제(i)
                      }}>삭제</button>
                      <span>{날짜[i]}</span>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="cont-enroll">
            <input className="input-todolist" value={할일입력} type="text" onChange={(e) => {
              set할일입력(e.target.value)
              set입력날짜(new Date().toLocaleString('ko-KR'))
            }} onKeyUp={e => {
              if (e.key === 'Enter') {
                할일입력.length <= 3 ? alert('좀 더 적어주세요!') : 목록렌더링()
              };
            }}></input>
            <button className="btn-enter" onClick={ () => {
              할일입력.length <= 3 ? alert('좀 더 적어주세요!') : 목록렌더링()
            }
            }>Enter</button>
        </div>
      </div>
    </div>
  );
}

export default App;