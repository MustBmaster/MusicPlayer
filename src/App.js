import { MusicPlayer } from "./components/MusicPlayer";
import song1 from "./assets/tracks/Coldplay - The Scientist.mp3";
import song2 from "./assets/tracks/JustaTee & Bigdaddy-2AM.mp3";

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

function App() {
  return (
    <div className="App">
      <MusicPlayer />
    </div>
  );
}

export default App;
