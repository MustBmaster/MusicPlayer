import styled from "styled-components";
import { FaStepBackward, FaStepForward, FaPlay, FaPause } from "react-icons/fa";
const StyledMusicControler = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 30px;
  /* trỏ tới tất cả các thằng con của nó để style */
  > * {
    color: green;
    height: 45px;
    width: 45px;
    cursor: pointer;
  }
`;

// Định nghĩa ra 1 cái controller gồm các nút để phát nhạc, nhận vào các props. Có 1 lưu ý là khi nhận nhiều props thì nên để
// props hoặc tạo 1 obj với các key là các prop của mình tự đặt
// isPlaying: bài hát đang phát, onPlayPause: cho dừng, onBack: bài hát khi ấn lùi, onForward bài hát khi ấn tiến
function MusicController({ isPlaying, onPlayPause, onBack, onForward }) {
  return (
    <StyledMusicControler>
      <FaStepBackward onClick={onBack} />
      {isPlaying ? (
        <FaPause
          onClick={() => {
            onPlayPause(false);
          }}
        />
      ) : (
        <FaPlay
          onClick={() => {
            onPlayPause(true);
          }}
        />
      )}
      <FaStepForward onClick={onForward} />
    </StyledMusicControler>
  );
}
export default MusicController;
