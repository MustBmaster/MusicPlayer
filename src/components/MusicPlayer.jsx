import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MusicController from "./MusicController";
import song1 from "../assets/tracks/Coldplay - The Scientist.mp3";
import song2 from "../assets/tracks/JustaTee & Bigdaddy-2AM.mp3";

const tracks = [
  {
    title: "The Scientist",
    artist: "ColdPlay",
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0lo7Z7MYUlFfMllybQ94Wdbg6ebNKBMHnGg&usqp=CAU",
    audioSrc: song1,
  },
  {
    title: "2AM",
    artist: "Justatee-BigDaddy",
    imageSrc: "https://i1.sndcdn.com/artworks-h4GubbxojmCD-0-t500x500.jpg",
    audioSrc: song2,
  },
];

const StyledInput = styled.input`
  height: 5px;
  -webkit-appearance: none;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 8px;
  background: #3b7677;
  transition: 0.2s ease;
  cursor: pointer;
`;

const StyledImg = styled.img`
  border-radius: 120px;
  display: block;
  margin: auto;
  height: 200px;
  width: 200px;
`;
const StyledMusicPlayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 350px;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 28px 28px rgba(0, 0, 0, 0.2);
  margin: auto;
  background-color: yellowgreen;
`;

export function MusicPlayer() {
  // State khởi đầu
  const [trackIndex, setTrackIndex] = useState(0); //Khởi tạo từ bài hát đầu tiên
  const [playing, setPlaying] = useState(false); // Chưa phát nhạc
  const [trackProgress, setTrackProgress] = useState(0); //Bắt đầu với thanh tiến độ = 0

  // khởi tạo obj bài hát
  const { title, artist, imageSrc, audioSrc } = tracks[trackIndex]; // bài hát tại con trỏ tương ứng của trackIndex

  // Giải thích kĩ hơn cho useRef: mỗi khi 1 components được render lại khi có sự thay đổi của state
  // 1 số giá trị sẽ được tái khởi tạo lại, nhưng nếu muốn giá trị này không thay đổi, thì cái useRef
  // sẽ giúp giữ nguyên giá trị đó qua mỗi lần render. nhận váo 1 tham số là khởi tạo cho lần mount đầu
  // tiên của components, các lần sau sẽ dựa trên giá trị đang có của tham chiếu chứ ko dựa trên khởi tạo
  // tham chiếu của useRef sẽ trả về giá trị là 1 obj, nên nếu muốn lấy ra kiểu dữ liệu gốc thì phải trỏ bằng .current
  //Các tham chiếu, sử dụng useRef
  const audioRef = useRef(new Audio(audioSrc)); // tham chiếu nhận khởi tạo thông qua constructor tạo audio với audioSrc
  const intervalRef = useRef(); // tham chiếu cho cái setInterval
  const isReady = useRef(false); // Cái này chưa hiểu, tính sau

  //Nút lùi bài hát
  const backBtnHandler = () => {
    //nếu mà lùi từ bài hát có vị trí 0 thì sẽ tới bài hát có vị trí n-1, còn không thì lùi 1
    if (trackIndex - 1 < 0) {
      // setTrackIndex sẽ thay đổi vào state
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
    console.log("back a song");
  };

  // Tương tự với nút tiến lên
  const forwardBtnHandler = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
    console.log("forward a song");
  };

  const startTimer = () => {
    //Loại bỏ thời gian đang chạy của các components trước
    clearInterval(intervalRef.current);
    // rồi setInterval cho cái thời gian chạy của 1 bài hát, cứ 1 giây chạy cập nhật tiến độ cho thanh tiến độ thông qua setTrackProgress
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) forwardBtnHandler();
      else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  //Giải thích kĩ hơn khi học useEffect((callback),[tham số]):
  // Các chức năng chính: call api, update DOM, clear timer, tạo phạm vi cho intevaltime
  // có 3 trường hợp
  // Chỉ có callback: thực hiện callback khi components re-render
  // Có thêm tham chiếu rỗng []: thực hiện callback 1 lần khi components mount
  // có thêm tham chiếu: thực hiện thay đổi khi tham số bị thay đổi

  // useEffect sử dụng cho việc phát bài hát, thay đổi khi state playing bị thay đổi
  useEffect(() => {
    //nếu state là playing=true thì trỏ vào thì cái tham chiếu-(.current là 1 đoạn âm) sẽ .play() để phát và ngược lại
    if (playing) {
      audioRef.current.play();
      // chạy thanh tiến độ của bài hát
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  // useEffect dùng cho việc khi chuyển đổi bài hát, sẽ dừng và unmount bài hát cũ
  useEffect(() => {
    //Thực hiện 1 lần duy nhất khi bỏ đi bài hát cũ nên ko dùng tham chiếu
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    // tham chiếu tới trackIndex, khi chuyển bài hát khác, trackIndex thay đổi và useEffect này chạy
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    // tiến độ của thanh tiến độ set bằng thời gian hiện tại của audio
    setTrackProgress(audioRef.current.currentTime);
    if (isReady.current) {
      // ở các lần chạy tiếp theo của bài hát thì bài hát sẽ tự động bắt đầu, bắt đầu thời gian thanh tiến độ
      audioRef.current.play();
      setPlaying(true);
      startTimer();
    } else {
      // lần đầu khởi tạo thì cái useEffect này chạy 1 lần, nên sẽ chạy vào điều kiện else.
      // cái isReady lúc đầu là false nên sau khi khởi tạo thì cái isReady sẽ thành true.
      // khi chuyển bài, trackIndex thay đổi nên useEffect này chạy lại và chạy vào điều khiện đầu tiên
      // khi đó thì bài hát sẽ tự chạy mà không cần ấn bắt đầu
      isReady.current = true;
    }
  }, [trackIndex]);

  const onProgressChange = (value) => {
    clearInterval(audioRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };
  const { duration } = audioRef.current;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";

  return (
    <StyledMusicPlayer>
      <StyledImg src={imageSrc} />
      <h2>{title}</h2>
      <h3>{artist}</h3>
      <MusicController
        isPlaying={playing}
        onBack={backBtnHandler}
        onForward={forwardBtnHandler}
        onPlayPause={setPlaying}
      />
      <StyledInput
        type="Range"
        value={trackProgress}
        step="1"
        onChange={(e) => onProgressChange(e.target.value)}
        min="0"
        max={duration ? duration : `${duration}`}
      />
    </StyledMusicPlayer>
  );
}
